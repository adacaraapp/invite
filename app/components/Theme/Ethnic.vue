<script lang="ts" setup>
import { motion } from "motion-v"

const props = defineProps<{
  data?: any;
}>();

// Open invitation state
const isOpen = ref(false);

// Audio controls
const audio = ref();
const audioPaused = ref(true);

// Countdown refs
const days = ref("00");
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");

const route = useRoute()

// rsvp state
const { data: messages, refresh } = await useFetch('https://db.sekeco.work/api/database/rows/table/689/?user_field_names=true', {
  headers: {
    Authorization: `Token zvrWD5DD2LbRjddJADoiKN2aIWIJLG7u`
  },
  query: {
    user_field_names: true,
    filters: { "filter_type": "AND", "filters": [{ "type": "equal", "field": "key", "value": props.data.code }], "groups": [] }
  }
})
const loading = ref(false)
const state = ref({
  code: props.data?.code,
  name: '',
  message: '',
  confirmation: '',
  tamu: 1,
})
const items = ref(['Hadir', 'Tidak Hadir'])
async function submitMessage() {
  try {
    const payload = {
      name: state.value.name,
      message: state.value.message,
      confirmation: state.value.confirmation,
      tamu: state.value.confirmation === 'Hadir' ? state.value.tamu : 0,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await useFetch(`/api/messages/${state.value.code}`, {
      method: 'POST',
      body: payload,
    });

    if (error.value) {
      throw new Error(error.value.message || 'Gagal mengirim ucapan');
    }

    alert('Ucapan berhasil dikirim! 🎉');
    await refresh();

    // Reset form
    state.value.name = '';
    state.value.message = '';
    state.value.confirmation = '';
    state.value.tamu = 1;

    // Optional: bisa fetch ulang messages setelah submit
    // await refreshNuxtData() atau re-fetch manual

  } catch (err) {
    console.error('Submit gagal:', err);
    // alert('Terjadi kesalahan saat mengirim ucapan');
  }
}

// Format date for display
const formattedDate = computed(() => {
  if (!props.data?.date) return "TBD";
  const d = new Date(props.data.date);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return d.toLocaleDateString("id-ID", opts).toUpperCase();
});

// Calculate target time
const targetTime = computed(() => {
  return props.data?.date ? new Date(props.data.date).getTime() : Date.now();
});

let timerId: ReturnType<typeof setInterval>;

// Update countdown function
function updateCountdown() {
  const now = Date.now();
  const distance = targetTime.value - now;

  if (distance <= 0) {
    // Event has passed
    days.value = hours.value = minutes.value = seconds.value = "00";
    clearInterval(timerId);
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  days.value = String(d).padStart(2, "0");
  hours.value = String(h).padStart(2, "0");
  minutes.value = String(m).padStart(2, "0");
  seconds.value = String(s).padStart(2, "0");
}

function playAudio() {
  audio.value = new Audio('/themes/ethnic/music.mp3')
  audio.value.loop = true;
  audioPaused.value = false;
  audio.value.play();
}

function toggleAudio() {
  if (audio.value) {
    if (audio.value.paused) {
      audioPaused.value = false;
      audio.value.play();
    } else {
      audioPaused.value = true;
      audio.value.pause();
    }
  }
}

// Add to calendar function
async function addToCalendarAction() {
  if (!props.data?.date) return;

  const dateStr = props.data.date;
  const groomName = props.data.groom?.short_name || "Groom";
  const brideName = props.data.bride?.short_name || "Bride";
  const venueAddress = props.data.venue?.address || "";

  await navigateTo(
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${groomName}+dan+${brideName}&dates=${dateStr}%2F${dateStr}&location=${venueAddress}&ctz=Asia/Jakarta`,
    {
      external: true,
      redirectCode: 302,
    }
  );
}

// Lifecycle hooks
onMounted(() => {
  updateCountdown(); // Calculate immediately
  timerId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<template>
  <main :class="[
    'bg-[#FCF8EA] font-libre text-ethnic-primary',
    isOpen ? '' : 'h-screen overflow-hidden',
  ]">
    <!-- <UButton
      class="fixed bottom-10 right-1/4"
      @click="() => { isOpen = false; }"
    >
      reset
    </UButton> -->

    <!-- Audio Toggle Button -->
    <UButton class="fixed z-40 right-4 bottom-4" :icon="!audioPaused ? 'i-lucide-volume-2' : 'i-lucide-volume-off'" @click="toggleAudio" />

    <section id="cover" :class="[
      'h-screen absolute w-full mx-auto sm:px-6 lg:px-8 max-w-lg left-1/2 -translate-x-1/2 transition-all duration-[2000ms] z-50',
      isOpen ? '-translate-y-full opacity-0' : 'opacity-100',
    ]">
      <div class="flex flex-col bg-[#FCF8EA] items-center h-full py-32 px-10">
        <img src="/themes/ethnic/flower1.png" alt="flower" class="mix-blend-multiply opacity-35 absolute top-0 -translate-y-3/5 w-4/5 left-1/2 -translate-x-1/2">
        <img src="/client/umu-shidqi/logo.png" alt="logo" class="relative -top-10 w-32">

        <div class="text-center">
          <h1 class="text-2xl font-bold font-berkshire text-ethnic-primary tracking-[8px]">
            {{ data?.bride?.short_name || "BRIDE" }}
            <span>&</span>
            {{ data?.groom?.short_name || "GROOM" }}
          </h1>
          <p class="text-ethnic-secondary font-medium font-mono">
            MENIKAH | {{ data?.date || "TBD" }}
          </p>
        </div>

        <div class="mt-auto text-center">
          <p class="text-sm mb-3">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p class="font-bold text-2xl">
            {{ route.query?.kepada || "Tamu Undangan" }}
          </p>
        </div>

        <UButton class="w-auto mt-10 rounded-full bg-ethnic-primary hover:bg-ethnic-primary/50" block @click="
          () => {
            isOpen = true;
            playAudio();
          }
        ">Open invitation</UButton>
      </div>
    </section>

    <section id="title" class="h-screen py-16 px-10 text-center flex flex-col items-center relative overflow-hidden">
      <!-- decorative -->
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 left-0 -translate-1/2 w-96 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 mix-blend-multiply scale-x-[-1]" />

      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.4 }" src="/themes/ethnic/flower2.png" alt="" class="absolute -right-56 bottom-0 w-[420px] mix-blend-multiply rotate-90 scale-[-1]" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.6 }" src="/themes/ethnic/flower2.png" alt="" class="absolute -left-56 bottom-0 w-[420px] mix-blend-multiply rotate-90 scale-x-[-1]" />

      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">THE WEDDING OF</motion.p>

      <motion.h1 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.3 }" class="text-4xl font-bold font-berkshire flex flex-col items-center mt-8 tracking-[8px]">
        <span>
          {{ data?.bride?.short_name || "BRIDE NAME" }}
        </span>
        <span>&</span>
        <span>
          {{ data?.groom?.short_name || "GROOM NAME" }}
        </span>
      </motion.h1>

      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.5 }" class="text-ethnic-secondary font-medium font-mono mt-8 text-lg">
        MENIKAH | {{ data?.date || "TBD" }}
      </motion.p>

      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.7 }" class="text-pretty font-bold mt-4">
        {{ data?.venue?.name || "VENUE NAME" }}
      </motion.p>
      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.8 }" class="text-pretty text-sm">
        {{ data?.venue?.address || "VENUE ADDRESS" }}
      </motion.p>

      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 1, delay: 0.9 }" src="/client/umu-shidqi/logo.png" alt="logo" class="relative mt-20 w-32" />
    </section>

    <section id="prologue" class="py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative justify-center overflow-hidden">

      <!-- Decorative flowers -->
      <motion.img :initial="{ opacity: 0, x: -50 }" :while-in-view="{ opacity: 0.1, x: 0 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute top-1/2 scale-x-[-1] left-0 -translate-1/2 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, x: 50 }" :while-in-view="{ opacity: 0.1, x: 0 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-72 mix-blend-multiply" />

      <motion.h3 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-4xl mb-4 font-berkshire font-bold text-ethnic-secondary">
        With Love
      </motion.h3>
      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.3 }" class="text-pretty text-sm leading-relaxed italic">
        "Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan
        orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki
        dan hamba-hamba sahayamu yang perempuan. Jika mereka miskin, Allah akan
        memampukan mereka dengan karunia-Nya. dan Allah Maha Luas
        (pemberian-Nya) lagi Maha mengetahui."
      </motion.p>
      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.5 }" class="text-pretty text-sm mt-4">
        Qs. An-Nur : 32
      </motion.p>
    </section>

    <section id="brides" class="h-screen py-20 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden">
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 left-0 -translate-1/2 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 mix-blend-multiply scale-x-[-1]" />

      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.4 }" src="/themes/ethnic/flower2.png" alt="" class="absolute -right-32 w-80 mix-blend-multiply bottom-28 rotate-90 scale-y-[-1]" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.6 }" src="/themes/ethnic/flower2.png" alt="" class="absolute -left-32 w-80 mix-blend-multiply bottom-28 rotate-90" />

      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-ethnic-secondary text-sm">Bismillahirrahmanirrahim</motion.p>
      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.2 }" class="text-lg font-semibold font-berkshire tracking-widest mb-8">
        Assalamu'alaikum Warahmatullahi Wabarakatuh
      </motion.p>
      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.4 }" class="text-pretty text-sm leading-loose">
        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
        menyelenggarakan acara pernikahan putra-putri kami:
      </motion.p>

      <div class="space-y-8 mt-8">
        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.6 }">
          <h3 class="text-xl font-bold mt-8 mb-2 text-nowrap">
            {{ data?.groom?.full_name || "GROOM FULL NAME" }}
          </h3>
          <p class="text-ethnic-secondary text-sm">
            bin {{ data?.groom?.father_name || "FATHER NAME" }}
          </p>
        </motion.div>

        <motion.p :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 1, delay: 0.8 }">dengan</motion.p>

        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 1 }">
          <h3 class="text-xl font-bold mt-8 mb-2 text-nowrap">
            {{ data?.bride?.full_name || "BRIDE FULL NAME" }}
          </h3>
          <p class="text-ethnic-secondary text-sm">
            binti {{ data?.bride?.father_name || "FATHER NAME" }}
          </p>
        </motion.div>
      </div>
    </section>

    <section id="countdown" class="min-h-96 py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative justify-center overflow-hidden">
      <!-- Decorative flowers -->
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src='/themes/ethnic/flower1.png' alt="flower" class="absolute -top-20 -left-20 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower2.png" alt="flower" class="absolute -bottom-20 -right-20 w-96 mix-blend-multiply" />

      <div class="relative z-10">
        <motion.h3 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-3xl font-bold font-berkshire text-ethnic-primary mb-2">
          Menuju Hari Bahagia
        </motion.h3>

        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.2 }" class="text-ethnic-secondary mb-8 text-sm">
          {{ formattedDate }}
        </motion.p>

        <!-- Countdown Display -->
        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.4 }" class="flex justify-center gap-6 mb-8">
          <motion.div :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.6, delay: 0.1 }" class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]">
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              days
              }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide">Hari</span>
          </motion.div>
          <motion.div :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.6, delay: 0.2 }" class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]">
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              hours
              }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide">Jam</span>
          </motion.div>
          <motion.div :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.6, delay: 0.3 }" class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]">
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              minutes
              }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide">Menit</span>
          </motion.div>
          <motion.div :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.6, delay: 0.4 }" class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]">
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              seconds
              }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide">Detik</span>
          </motion.div>
        </motion.div>

        <!-- Save the Date Button -->
        <motion.button :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.6 }" class="bg-ethnic-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-ethnic-primary/90 transition-colors shadow-lg" @click="addToCalendarAction">
          Save The Date
        </motion.button>
      </div>
    </section>

    <section id="held" class="h-screen py-16 px-3 border-t-8 border-ethnic-primary relative overflow-hidden">
      <!-- Decorative flowers -->
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute -bottom-20 -left-20 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower2.png" alt="flower" class="absolute -top-20 -right-20 w-96 mix-blend-multiply scale-y-[-1]" />

      <div class="relative z-10 w-full text-center flex flex-col items-center">
        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-sm mb-8">Diselenggarakan pada</motion.p>
        <motion.h3 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.2 }" class="text-2xl font-bold mb-1 font-berkshire">{{ data?.day }}, {{ data?.date_long }}</motion.h3>
        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.3 }" class="text-ethnic-secondary">{{ data?.date_hijri }}</motion.p>

        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.4 }" class="flex items-start mt-10 divide-x w-full">
          <div class="px-3 w-full">
            <h6 class="text-sm">{{ data?.events[0].name }}</h6>
            <p class="text-xl">{{ data?.events[0].time }}</p>
          </div>
          <div class="px-3 w-full">
            <h6 class="text-sm">{{ data?.events[1].name }}</h6>
            <p class="text-xl">{{ data?.events[1].time }}</p>
          </div>
        </motion.div>

        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.5 }" class="mt-10 flex flex-col items-center px-3">
          <p class="mb-4 text-sm">Bertempat di</p>
          <h6 class="text-lg font-bold">{{ data?.venue.name }}</h6>
          <p class="text-sm text-balance">{{ data?.venue.address }}</p>
          <!-- <div class="mt-8 p-3 rounded-xl bg-white">
              <img :src="data?.venue.qr_location" alt="qr location" class="w-32">
          </div> -->
          <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/50 mx-auto rounded-full mt-8" :to="data?.venue?.google_maps" target="_blank">Open in Google Maps</UButton>
        </motion.div>
      </div>
    </section>

    <!-- <section
      id="gallery"
      class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative"
    >
    </section> -->

    <section id="gift" class="py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden">
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute top-1/2 scale-x-[-1] left-0 -translate-1/2 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-72 mix-blend-multiply" />

      <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex items-center gap-2 justify-center mb-4">
        <img src="/themes/ethnic/flower2.png" class="w-16 lg:w-20 rotate-180 mix-blend-multiply opacity-60" alt="">
        <h4 class="text-2xl font-bold font-berkshire text-ethnic-primary">Wedding Gift</h4>
        <img src="/themes/ethnic/flower2.png" class="w-16 lg:w-20 mix-blend-multiply opacity-60" alt="">
      </motion.div>

      <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.2 }" class="text-sm mb-6 text-pretty leading-relaxed">
        Doa restu Bapak/Ibu merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless
      </motion.p>

      <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.3 }">
        <UModal title="Wedding Gift">
          <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/50 mx-auto rounded-full">Amplop Digital</UButton>
          <template #body>
            <div v-for="(account, index) in data?.gift?.accounts" :key="index" class="flex items-center gap-8 mb-8">
              <div class="w-24">
                <img class="block w-full aspect-auto" :src="account.bank_logo" alt="">
              </div>
              <div>
                <div class="text-lg font-semibold">{{ account.account_name }}</div>
                <div class="text-(--ui-text-muted)">{{ account.bank_name }}</div>
                <div class="font-semibold">{{ account.account_number }}</div>
                <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/50 mx-auto rounded-full" @click="copyToClipboard(account.account_number)">Copy</UButton>
              </div>
            </div>
          </template>
        </UModal>
      </motion.div>
    </section>

    <section id="messages" class="py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden">
      <!-- Decorative flowers -->
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute -top-20 -left-20 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower2.png" alt="flower" class="absolute -bottom-20 -right-20 w-96 mix-blend-multiply" />

      <div class="relative z-10 w-full max-w-md">
        <motion.h3 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-2xl font-bold mb-2 font-berkshire text-ethnic-primary">Ucapan & RSVP</motion.h3>
        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.2 }" class="text-sm mb-8 text-ethnic-secondary">
          Berikan ucapan terbaik untuk Kedua Mempelai & Konfirmasi Kehadiran
        </motion.p>

        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.3 }" class="space-y-4">
          <UFormField label="Nama" required :ui="{ label: 'text-ethnic-primary font-medium', root: 'w-full' }">
            <UInput v-model="state.name" placeholder="Masukkan nama kamu" class="w-full" />
          </UFormField>

          <UFormField label="Ucapan & Doa" required :ui="{ label: 'text-ethnic-primary font-medium', root: 'w-full' }">
            <UTextarea v-model="state.message" placeholder="Masukkan ucapan & doa kamu" class="w-full" />
          </UFormField>

          <UFormField label="Konfirmasi Kehadiran" required :ui="{ label: 'text-ethnic-primary font-medium', root: 'w-full' }">
            <URadioGroup v-model="state.confirmation" orientation="horizontal" indicator="hidden" variant="card" :items="items" />
          </UFormField>

          <UFormField v-if="state.confirmation === 'Hadir'" required :ui="{ label: 'text-ethnic-primary font-medium', root: 'w-full' }">
            <UButtonGroup class="w-full">
              <USelect v-model="state.tamu" color="neutral" variant="subtle" :items="[1, 2, 3, 4, 5]" class="w-full" :ui="{ base: 'pl-[100px]', leading: 'pointer-events-none bg-ethnic-primary text-white rounded-l-md px-2' }" :default-value="1">
                <template #leading>
                  <p class="text-sm">
                    Jumlah Tamu
                  </p>
                </template>
              </USelect>
            </UButtonGroup>
          </UFormField>

          <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/90 rounded-full w-full font-semibold transition-colors" block :loading="loading" @click="submitMessage">
            Kirim Ucapan
          </UButton>
        </motion.div>

        <!-- Messages Display -->
        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.4 }" class="mt-8">
          <h4 class="text-lg font-bold text-ethnic-primary mb-4 font-berkshire">Ucapan dari Tamu</h4>
          <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.5 }" class="overflow-y-auto max-h-64 w-full space-y-3 bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <template v-for="(message, index) in (messages?.results || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())" :key="index">
              <div class="flex gap-3 p-3 bg-white rounded-lg shadow-sm border border-ethnic-primary/10">
                <UIcon name="i-lucide-user-circle" class="size-8 shrink-0 text-ethnic-primary" />
                <div class="text-left flex-1">
                  <h5 class="font-bold text-ethnic-primary">{{ message.name }}</h5>
                  <p class="text-xs text-ethnic-secondary mb-1">
                    {{ new Date(message.created_at).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) }}
                  </p>
                  <p class="text-sm text-gray-700 leading-relaxed">
                    {{ message.message }}
                  </p>
                </div>
              </div>
            </template>

            <div v-if="!messages?.results?.length" class="text-center py-8">
              <p class="text-ethnic-secondary text-sm">Belum ada ucapan. Jadilah yang pertama!</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section id="epilogue" class="min-h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden">
      <!-- Decorative flowers -->
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1 }" src="/themes/ethnic/flower1.png" alt="flower" class="absolute -top-20 -left-20 w-72 mix-blend-multiply" />
      <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.1, scale: 1 }" :transition="{ duration: 1, delay: 0.2 }" src="/themes/ethnic/flower2.png" alt="flower" class="absolute -bottom-20 -right-20 w-96 mix-blend-multiply" />

      <div class="relative z-10 max-w-lg mx-auto">
        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-16">
          <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 1, delay: 0.3 }" src="/client/umu-shidqi/logo.png" alt="logo" class="w-24 mx-auto mb-8" />

          <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.4 }" class="text-pretty text-sm leading-relaxed mb-4 text-gray-700">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra-putri kami.
          </motion.p>

          <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.5 }" class="font-bold text-lg text-ethnic-primary font-berkshire">
            Wassalamu'alaikum Warahmatullahi Wabarakatuh
          </motion.p>
        </motion.div>

        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.6 }" class="space-y-8">
          <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.7 }" class="text-ethnic-secondary text-sm font-medium">Kami yang berbahagia</motion.p>

          <motion.div v-if="data?.families?.length" :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.8 }" class="space-y-6">
            <motion.div v-for="(family, index) in data.families" :key="index" :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.9 + (index * 0.1) }" class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-ethnic-primary/20 shadow-sm">
              <p class="text-xs text-ethnic-secondary mb-1">Keluarga Besar</p>
              <p class="font-semibold text-ethnic-primary text-sm">{{ family }}</p>
            </motion.div>
          </motion.div>

          <!-- Fallback if no families data -->
          <motion.div v-else :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.8 }" class="grid grid-cols-1 gap-4">
            <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 0.9 }" class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-ethnic-primary/20 shadow-sm">
              <p class="text-xs text-ethnic-secondary mb-1">Keluarga Besar</p>
              <p class="font-semibold text-ethnic-primary text-sm">
                {{ data?.groom?.father_name || "Keluarga Mempelai Pria" }}
              </p>
            </motion.div>
            <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 1.0 }" class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-ethnic-primary/20 shadow-sm">
              <p class="text-xs text-ethnic-secondary mb-1">Keluarga Besar</p>
              <p class="font-semibold text-ethnic-primary text-sm">
                {{ data?.bride?.father_name || "Keluarga Mempelai Wanita" }}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>

  </main>
</template>
