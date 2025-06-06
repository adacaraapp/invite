<script lang="ts" setup>
import { motion } from "motion-v"

const props = defineProps<{
  data?: any;
}>();

/**
 * Hanya gunakan asset:
 * - /themes/ethnic/flower1.png
 * - /themes/ethnic/flower2.png
 *
 * Untuk gambar lainnya, gunakan asset dari folder `public` atau `assets`.
 *
 * Tidak ada foto pengantin pria dan wanita, jadi gunakan font inisial saja
 */
 
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

// rsvp state
const { data: messages, refresh } = await useFetch('https://db.sekeco.work/api/database/rows/table/689/?user_field_names=true', {
    headers: {
        Authorization: `Token zvrWD5DD2LbRjddJADoiKN2aIWIJLG7u`
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

        // Tutup modal (jika ada)
        isOpen.value = false;

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
    audio.value = new Audio('/javanese/music.mp3')
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
  <main
    :class="[
      'bg-orange-50 font-libre text-ethnic-primary',
      isOpen ? '' : 'h-screen overflow-hidden',
    ]"
  >
    <UButton
      class="fixed bottom-10 right-1/4"
      @click="() => { isOpen = false; }"
    >
      reset
    </UButton>

    <!-- Audio Toggle Button -->
     <UButton 
        class="fixed z-40 right-4 bottom-4" 
        :icon="!audioPaused ? 'i-lucide-volume-2' : 'i-lucide-volume-off'"
        @click="toggleAudio" 
    />

    <section
      id="cover"
      :class="[
        'h-screen absolute w-full mx-auto sm:px-6 lg:px-8 max-w-lg left-1/2 -translate-x-1/2 transition-all duration-[2000ms] z-50',
        isOpen ? '-translate-y-full opacity-0' : 'opacity-100',
      ]"
    >
      <div class="flex flex-col bg-orange-50 items-center h-full py-32 px-10">
        <img
          src="/themes/ethnic/flower1.png"
          alt="flower"
          class="mix-blend-multiply opacity-35 absolute top-0 -translate-y-3/5 w-4/5 left-1/2 -translate-x-1/2"
        >
        <img
          src="/client/umu-shidqi/logo.png"
          alt="logo"
          class="relative -top-10 w-32"
        >

        <div class="text-center">
          <h1
            class="text-2xl font-bold font-berkshire text-ethnic-primary tracking-[8px]"
          >
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
            {{ data?.recipient?.name || "Tamu Undangan" }}
          </p>
        </div>

        <UButton
          class="w-auto mt-10 rounded-full bg-ethnic-primary hover:bg-ethnic-primary/50"
          block
          @click="
            () => {
              isOpen = true;
              playAudio();
            }
          "
          >Open invitation</UButton
        >
      </div>
    </section>

    <section
      id="title"
      class="h-screen py-16 px-10 text-center flex flex-col items-center relative overflow-hidden"
    >
        <!-- decorative -->
         <img src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 left-0 -translate-1/2 w-96 opacity-10 mix-blend-multiply">
         <img src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 opacity-10 mix-blend-multiply scale-x-[-1]">

         <img src="/themes/ethnic/flower2.png" alt="" class="absolute -right-56 bottom-0 w-[420px] opacity-10 mix-blend-multiply rotate-90 scale-[-1]">
            <img src="/themes/ethnic/flower2.png" alt="" class="absolute -left-56 bottom-0 w-[420px] opacity-10 mix-blend-multiply rotate-90 scale-x-[-1]">

      <p>THE WEDDING OF</p>

      <h1
        class="text-4xl font-bold font-berkshire flex flex-col items-center mt-8 tracking-[8px]"
      >
        <span>
          {{ data?.bride?.short_name || "BRIDE NAME" }}
        </span>
        <span>&</span>
        <span>
          {{ data?.groom?.short_name || "GROOM NAME" }}
        </span>
      </h1>

      <p class="text-ethnic-secondary font-medium font-mono mt-8 text-lg">
        MENIKAH | {{ data?.date || "TBD" }}
      </p>

      <p class="text-sm mt-2">
        {{ data?.venue?.address || "VENUE ADDRESS" }}
      </p>

      <img
        src="/client/umu-shidqi/logo.png"
        alt="logo"
        class="relative mt-16 w-32"
      >
    </section>

    <section
      id="prologue"
      class="py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative justify-center"
    >
      <h3 class="text-4xl mb-4 font-berkshire font-bold text-ethnic-secondary">
        With Love
      </h3>
      <p class="text-pretty text-sm leading-relaxed">
        "Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan
        orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki
        dan hamba-hamba sahayamu yang perempuan. Jika mereka miskin, Allah akan
        memampukan mereka dengan karunia-Nya. dan Allah Maha Luas
        (pemberian-Nya) lagi Maha mengetahui."
      </p>
    </section>

    <section
      id="brides"
      class="h-screen py-20 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden"
    >
        <img src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 left-0 -translate-1/2 w-72 opacity-10 mix-blend-multiply">
        <img src="/themes/ethnic/flower1.png" alt="" class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 opacity-10 mix-blend-multiply scale-x-[-1]">

        <img src="/themes/ethnic/flower2.png" alt="" class="absolute -right-32 w-80 opacity-10 mix-blend-multiply bottom-28 rotate-90 scale-y-[-1]">
        <img src="/themes/ethnic/flower2.png" alt="" class="absolute -left-32 w-80 opacity-10 mix-blend-multiply bottom-28 rotate-90">

      <p class="text-ethnic-secondary text-sm">Bismillahirrahmanirrahim</p>
      <p class="text-lg font-semibold font-berkshire tracking-widest mb-8">
        Assalamu'alaikum Warahmatullahi Wabarakatuh
      </p>
      <p class="text-pretty text-sm leading-loose">
        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
        menyelenggarakan acara pernikahan putra-putri kami:
      </p>

      <div class="space-y-8 mt-8">
        <div>
          <h3 class="text-3xl font-bold mt-8 mb-2">
            {{ data?.groom?.full_name || "GROOM FULL NAME" }}
          </h3>
          <p class="text-ethnic-secondary">
            bin {{ data?.groom?.father_name || "FATHER NAME" }}
          </p>
        </div>

        <p>dengan</p>

        <div>
          <h3 class="text-3xl font-bold mt-8 mb-2">
            {{ data?.bride?.full_name || "BRIDE FULL NAME" }}
          </h3>
          <p class="text-ethnic-secondary">
            binti. {{ data?.bride?.father_name || "FATHER NAME" }}
          </p>
        </div>
      </div>
    </section>

    <section
      id="countdown"
      class="min-h-96 py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative justify-center overflow-hidden"
    >
      <!-- Decorative flowers -->
      <img
        src='/themes/ethnic/flower1.png'
        alt="flower"
        class="absolute -top-20 -left-20 w-72 opacity-10 mix-blend-multiply"
      >
      <img
        src="/themes/ethnic/flower2.png"
        alt="flower"
        class="absolute -bottom-20 -right-20 w-96 opacity-10 mix-blend-multiply"
      >

      <div class="relative z-10">
        <h3 class="text-3xl font-bold font-berkshire text-ethnic-primary mb-2">
          Menuju Hari Bahagia
        </h3>

        <p class="text-ethnic-secondary mb-8 text-sm">
          {{ formattedDate }}
        </p>

        <!-- Countdown Display -->
        <div class="flex justify-center gap-6 mb-8">
          <div
            class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]"
          >
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              days
            }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide"
              >Hari</span
            >
          </div>
          <div
            class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]"
          >
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              hours
            }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide"
              >Jam</span
            >
          </div>
          <div
            class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]"
          >
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              minutes
            }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide"
              >Menit</span
            >
          </div>
          <div
            class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-[80px]"
          >
            <span class="text-3xl font-bold text-ethnic-primary font-mono">{{
              seconds
            }}</span>
            <span class="text-xs text-ethnic-secondary uppercase tracking-wide"
              >Detik</span
            >
          </div>
        </div>

        <!-- Save the Date Button -->
        <button
          class="bg-ethnic-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-ethnic-primary/90 transition-colors shadow-lg"
          @click="addToCalendarAction"
        >
          Save The Date
        </button>
      </div>
    </section>

    <section
      id="held"
      class="h-screen py-16 px-3 border-t-8 border-ethnic-primary relative overflow-hidden"
    >
        <img
            src="/themes/ethnic/flower1.png"
            alt="flower"
            class="absolute top-1/2 left-1/2 -translate-1/2 w-96 opacity-10 mix-blend-multiply z-0"
        >

      <div class="relative z-10 w-full text-center flex flex-col items-center">
        <p class="text-sm mb-8">Diselenggarakan pada</p>
      <h3 class="text-2xl font-bold mb-1 font-berkshire tracking-[4px]">{{ data?.day }}, {{ data?.date }}</h3>
      <p class="text-ethnic-secondary">{{ data?.date_hijri }}</p>

      <div class="flex items-start mt-10 divide-x w-full">
        <div class="px-3 w-full">
            <h6 class="text-sm">{{data?.events[0].name}}</h6>
            <p class="text-xl">{{data?.events[0].time}}</p>
        </div>
        <div class="px-3 w-full">
            <h6 class="text-sm">{{data?.events[1].name}}</h6>
            <p class="text-xl">{{data?.events[1].time}}</p>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center px-3">
        <p class="mb-4 text-sm">Bertempat di</p>
        <h6 class="text-lg font-bold">{{ data?.venue.name }}</h6>
        <p class="text-sm text-balance">{{ data?.venue.address }}</p>
        <div class="mt-8 p-3 rounded-xl bg-white">
            <img :src="data?.venue.qr_location" alt="qr location" class="w-32">
        </div>
      </div>
      </div>
    </section>
    
    <!-- <section
      id="gallery"
      class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative"
    >
    </section> -->

    <section
      id="gift"
      class="py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden"
    >
        <img
            src="/themes/ethnic/flower1.png"
            alt="flower"
            class="absolute top-1/2 scale-x-[-1] left-0 -translate-1/2 w-72 opacity-10 mix-blend-multiply"
        >
        <img
            src="/themes/ethnic/flower1.png"
            alt="flower"
            class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-72 opacity-10 mix-blend-multiply"
        >


      <h4 class="text-2xl mb-2 font-bold">Wedding Gift</h4>
      <p class="text-sm mb-4">
        Doa restu Bapak/Ibu merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless
      </p>
    <UModal title="Wedding Gift">
        <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/50 mx-auto rounded-full">Amplop Digital</UButton>
        <template #body>
            <div class="flex items-center gap-8 mb-8">
                <div class="w-24">
                    <img class="block w-full aspect-auto" src="/logos/bca.png" alt="">
                </div>
                <div>
                    <div class="text-lg font-semibold">{{ data?.bride?.full_name || "BRIDE NAME" }}</div>
                    <div class="text-(--ui-text-muted)">Bank Central Asia (BCA)</div>
                    <div class="font-semibold">123******</div>
                    <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/50 mx-auto rounded-full" @click="copyToClipboard('123******')">Copy</UButton>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <div class="w-24">
                    <img class="block w-full aspect-auto" src="/logos/mandiri.png" alt="">
                </div>
                <div>
                    <div class="text-lg font-semibold">{{ data?.groom?.full_name || "GROOM NAME" }}</div>
                    <div class="text-(--ui-text-muted)">Bank Mandiri</div>
                    <div class="font-semibold">123******</div>
                    <UButton class="bg-ethnic-primary hover:bg-ethnic-primary/50 mx-auto rounded-full" @click="copyToClipboard('123******')">Copy</UButton>
                </div>
            </div>
        </template>
    </UModal>
    </section>

    <section
      id="messages"
      class="py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden"
    >
      <!-- Decorative flowers -->
      <img
        src="/themes/ethnic/flower1.png"
        alt="flower"
        class="absolute -top-20 -left-20 w-72 opacity-10 mix-blend-multiply"
      >
      <img
        src="/themes/ethnic/flower2.png"
        alt="flower"
        class="absolute -bottom-20 -right-20 w-96 opacity-10 mix-blend-multiply"
      >

      <div class="relative z-10 w-full max-w-md">
        <h3 class="text-2xl font-bold mb-2 font-berkshire text-ethnic-primary">Ucapan & RSVP</h3>
        <p class="text-sm mb-8 text-ethnic-secondary">
          Berikan ucapan terbaik untuk Kedua Mempelai & Konfirmasi Kehadiran
        </p>
        
        <div class="space-y-4">
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
        </div>

        <!-- Messages Display -->
        <div class="mt-8">
          <h4 class="text-lg font-bold text-ethnic-primary mb-4 font-berkshire">Ucapan dari Tamu</h4>
          <motion.div 
            :initial="{ opacity: 0, y: 50 }" 
            :while-in-view="{ opacity: 1, y: 0 }" 
            :transition="{ duration: 1 }" 
            class="overflow-y-auto max-h-64 w-full space-y-3 bg-white/50 backdrop-blur-sm rounded-lg p-4"
          >
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
        </div>
      </div>
    </section>

    <section
      id="epilogue"
      class="min-h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative overflow-hidden"
    >
      <!-- Decorative flowers -->
      <img
        src="/themes/ethnic/flower1.png"
        alt="flower"
        class="absolute -top-20 -left-20 w-72 opacity-10 mix-blend-multiply"
      >
      <img
        src="/themes/ethnic/flower2.png"
        alt="flower"
        class="absolute -bottom-20 -right-20 w-96 opacity-10 mix-blend-multiply"
      >

      <div class="relative z-10 max-w-lg mx-auto">
        <motion.div 
          :initial="{ opacity: 0, y: 50 }" 
          :while-in-view="{ opacity: 1, y: 0 }" 
          :transition="{ duration: 1 }" 
          class="mb-16"
        >
        <img
            src="/client/umu-shidqi/logo.png"
            alt="logo"
            class="w-24 mx-auto mb-8"
        >
          
          <p class="text-pretty text-sm leading-relaxed mb-4 text-gray-700">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra-putri kami.
          </p>
          
          <p class="font-bold text-lg text-ethnic-primary font-berkshire">
            Wassalamu'alaikum Warahmatullahi Wabarakatuh
          </p>
        </motion.div>

        <motion.div 
          :initial="{ opacity: 0, y: 50 }" 
          :while-in-view="{ opacity: 1, y: 0 }" 
          :transition="{ duration: 1, delay: 0.3 }" 
          class="space-y-8"
        >
          <p class="text-ethnic-secondary text-sm font-medium">Kami yang berbahagia</p>

          <div v-if="data?.families?.length" class="space-y-6">
            <div 
              v-for="(family, index) in data.families" 
              :key="index"
              class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-ethnic-primary/20 shadow-sm"
            >
              <p class="text-xs text-ethnic-secondary mb-1">Keluarga Besar</p>
              <p class="font-semibold text-ethnic-primary text-sm">{{ family }}</p>
            </div>
          </div>
          
          <!-- Fallback if no families data -->
          <div v-else class="grid grid-cols-1 gap-4">
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-ethnic-primary/20 shadow-sm">
              <p class="text-xs text-ethnic-secondary mb-1">Keluarga Besar</p>
              <p class="font-semibold text-ethnic-primary text-sm">
                {{ data?.groom?.father_name || "Keluarga Mempelai Pria" }}
              </p>
            </div>
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-ethnic-primary/20 shadow-sm">
              <p class="text-xs text-ethnic-secondary mb-1">Keluarga Besar</p>
              <p class="font-semibold text-ethnic-primary text-sm">
                {{ data?.bride?.father_name || "Keluarga Mempelai Wanita" }}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

  </main>
</template>
