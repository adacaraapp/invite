<script lang="ts" setup>
import { motion } from "motion-v"
// const dayjs = useDayjs()

const route = useRoute()

const data = {
    groom: {
        name: 'Ridwan',
        full_name: 'M. Ridwan Dwi Astanto, S.T.P., M.T.'
    },
    bride: {
        name: 'Icha',
        full_name: 'Fitri Chairunnisa, S.T.P., M.Si.',
    },
    recipient: {
        name: route.query.kepada as string
    },
    venue: {
        link: 'https://maps.app.goo.gl/A3XDH6k5GNhBBUeH6'
    },
    date: '2025-06-01'
}

const loading = ref(false)

// countdown refs
const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

// format tanggal (opsional uppercase)
const formattedDate = computed(() => {
    // misal "MINGGU, 01 JUNI 2025"
    const d = new Date(data.date)
    const opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }
    return d.toLocaleDateString('id-ID', opts).toUpperCase()
})

// hitung waktu target sekali
const targetTime = new Date(data.date).getTime()

let timerId: ReturnType<typeof setInterval>

// fungsi update
function updateCountdown() {
    const now = Date.now()
    const distance = targetTime - now

    if (distance <= 0) {
        // sudah lewat
        days.value = hours.value = minutes.value = seconds.value = '00'
        clearInterval(timerId)
        return
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24))
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((distance % (1000 * 60)) / 1000)

    days.value = String(d).padStart(2, '0')
    hours.value = String(h).padStart(2, '0')
    minutes.value = String(m).padStart(2, '0')
    seconds.value = String(s).padStart(2, '0')
}

onMounted(() => {
    updateCountdown()  // hitung segera
    timerId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
    clearInterval(timerId)
})

const items = ref(['Hadir', 'Tidak Hadir'])

const state = ref({
    code: 'icha-ridwan',
    name: '',
    message: '',
    confirmation: '',
    tamu: 1,
})

const isOpen = ref(false)

async function addToCalendarAction() {
    await navigateTo(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${data.groom.name}+dan+${data.bride.name}&dates=${data.date}%2F${data.date}&location=${data.venue.link}&ctz=Asia/Jakarta `, {
        external: true,
        redirectCode: 302
    }
    )
}

const { data: messages, refresh } = await useFetch(`/api/messages/${state.value.code}`, {
    key: `messages-${state.value.code}`,
});

const images = [
    '/javanese/clients/1.jpg',
    '/javanese/clients/14.jpg',

    '/javanese/clients/10.jpg',
    '/javanese/clients/9.jpg',

    '/javanese/clients/3.jpg',
    '/javanese/clients/4.jpg',

    '/javanese/clients/11.jpg',
    '/javanese/wedding-photos/with-love.jpg',

    '/javanese/clients/7.jpg',
    '/javanese/clients/8.jpg',

    '/javanese/clients/5.jpg',
    '/javanese/clients/6.jpg'
]

const visibleRef = ref(false);
const indexRef = ref(0);
const showImg = (index) => {
    indexRef.value = index;
    visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);


async function submitMessage() {
    try {
        const payload = {
            name: state.value.name,
            message: state.value.message,
            confirmation: state.value.confirmation,
            tamu: state.value.confirmation === 'Hadir' ? state.value.tamu : 0,
        };

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
        alert('Terjadi kesalahan saat mengirim ucapan');
    }
}

const audio = ref();
const audioPaused = ref(true);

function playAudio() {
    audio.value = new Audio('/javanese/music.mp3')
    audio.value.loop = true;
    audio.value.play();
}

function toggleAudio() {
    if (audio.value) {
        if (audio.value.paused) {
            audioPaused.value = false
            audio.value.play();
        } else {
            audioPaused.value = true
            audio.value.pause();
        }
    }
}
</script>

<template>
    <main :class="['light', isOpen ? '' : 'h-screen overflow-hidden']">

        <!-- <UButton @click="() => {
            isOpen = false
        }" class="fixed bottom-10 right-1/4">reset</UButton> -->

        <!-- welcome section -->
        <section :class="['absolute w-full mx-auto sm:px-6 lg:px-8 max-w-lg left-1/2 -translate-x-1/2 transition-all duration-[2000ms] z-50 shadow-2xl text-gold', isOpen ? '-translate-y-full opacity-0' : 'opacity-100']">
            <div class="min-h-screen w-full bg-primary flex flex-col justify-end items-center relative py-28 px-10">
                <img src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply opacity-75 absolute size-full object-cover top-0 left-0 z-0 pointer-events-none">

                <div class="h-full flex flex-col justify-end items-center z-10">
                    <motion.img :initial="{ opacity: 0 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" src="/javanese/logo_emblem.svg" alt="logo" class="absolute w-64 top-18 z-50 pointer-events-none" />
                    <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-2 font-forum">THE WEDDING OF</motion.p>
                    <motion.h1 :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="flex items-center justify-center mx-auto gap-2 mb-5">
                        <motion.img :initial="{ opacity: 0, scale: 0.8 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, scale: 1 }" src="/javanese/logo.svg" class="w-48 mx-auto mb-5 relative z-30" alt="logo" />
                    </motion.h1>
                    <motion.div :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="space-y-4">
                        <div class="flex flex-col text-center mb-3 font-forum" v-if="data.recipient.name">
                            <span>Kepada Yth.</span>
                            <span>Bapak/Ibu/Saudara/i</span>
                            <span><strong>{{ data.recipient.name }}</strong></span>
                        </div>
                        <UButton class="mx-auto rounded-full" block @click="() => { isOpen = true; playAudio() }">Open invitation</UButton>
                    </motion.div>
                </div>
            </div>
        </section>
        <!-- end welcome section -->


        <!-- section home -->
        <section class="bg-primary min-h-[600px] h-screen relative text-gold font-forum overflow-hidden">

            <UButton @click="() => { toggleAudio() }" class="fixed z-40 right-4 bottom-4" :icon="!audioPaused ? 'i-lucide-volume-2' : 'i-lucide-volume-off'" />

            <div :class="['absolute h-full z-40 left-0 top-0 size-full transition-all duration-1000 delay-500 ease-in-out', isOpen ? ' animate-entrance' : '']">
                <div class=" bg-gold mask-subtract mask-[url(/javanese/background-transition-old.png),url(/javanese/logo-background.svg)] absolute left-0 top-0 w-full h-screen mask-size-[100%] z-50 mask-center mask-no-repeat" />
                <!-- <img src="/javanese/background-transition.png" class="h-screen w-full absolute top-0 left-0 object-cover object-center" alt=""> -->
                <div class="bg-gold absolute top-0 left-0 w-full h-1/5 z-50" />
                <div class="bg-gold absolute bottom-0 left-0 w-full h-1/5 z-50" />


                <!-- flowers -->
                <!-- <div class="absolute bottom-0 left-0 size-full z-50">
                    <motion.img :animate="{ rotate: [-45, -30, -45] }" :transition="{duration: 5,repeat: Infinity,easing: 'easeInOut'}" src="/javanese/flowers/2.png" alt="" class="size-60 object-contain absolute -top-64 -left-20 scale-y-[-1] origin-bottom-left -rotate-45" />

                    <motion.img :animate="{ rotate: [-3, 3, -3] }" :transition="{duration: 3, repeat: Infinity, easing:'easeInOut'}" src="/javanese/flowers/1-flip.png" alt="" class="size-48 object-contain origin-bottom-left absolute -bottom-10 -left-10 scale-125" />

                    <motion.img :animate="{ rotate: [3, -3, 3] }" :transition="{duration: 3, repeat: Infinity, easing: 'easeInOut'}" src="/javanese/flowers/1.png" alt="" class="size-48 object-contain absolute -bottom-10 -right-10 origin-bottom-right scale-125" />

                    <motion.img :animate="{ rotate: [-25, -20, -25] }" :transition="{ duration: 5, repeat: Infinity, easing: 'easeInOut'}" src="/javanese/flowers/3.png" alt="" class="size-60 object-contain absolute -top-0 -right-32 origin-bottom-right" />
                </div> -->
            </div>

            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />

            <div class="flex flex-col justify-end items-center py-28 px-10 relative">
                <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-2 relative z-30">THE WEDDING OF</motion.p>
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, scale: 1 }" src="/javanese/logo.svg" class="w-80 mb-5 relative z-30" alt="logo" />
                <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-2 text-white font-bold text-xl">MINGGU, 01 JUNI 2025
                </motion.p>
                <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-12">Ballroom Hotel Harper Palembang</motion.p>
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, scale: 1 }" src="/javanese/logo_emblem.svg" class="w-42" alt="logo emblem" />
            </div>

            <div class="grid place-items-center">
                <UBadge icon="lucide-arrow-up" class="mx-auto mb-5 z-10 text-center" size="lg" color="primary" label="Geser ke atas atau scroll up" />
            </div>

        </section>
        <!-- end section home -->

        <!-- section qoute & wedding -->
        <section class="min-h-screen bg-white relative flex flex-col text-black">
            <div class="h-4 bg-gold" />
            <!-- <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]"></div> -->

            <motion.img :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 left-2 w-28" />
            <motion.img :initial="{ opacity: 0, x: -50, y: 0 }" :while-in-view="{ opacity: 1, x: 0, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 right-2 w-28 rotate-90" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 left-2 w-28 scale-y-[-1]" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 right-2 w-28 rotate-90 scale-x-[-1]" />

            <div class="grow py-20 px-4 sm:px-6 md:px-14 font-forum space-y-10 text-center relative z-10">
                <!-- <UCard class="text-center text-sm text-muted h-56 w-full" variant="soft"/> -->
                <div class="pt-12">
                    <img src="/javanese/clients/14.jpg" alt="with love image" class="object-cover object-center w-full rounded-lg">
                </div>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <h3 class="text-3xl font-bold text-primary">With Love</h3>
                    <p class="text-pretty">
                        "Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak
                        (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika
                        mereka miskin, Allah akan memampukan mereka dengan karunia-Nya. dan Allah Maha Luas
                        (pemberian-Nya) lagi Maha mengetahui."
                    </p>
                    <motion.p class="text-primary font-bold">QS An-Nur: 32</motion.p>
                </motion.div>
            </div>

            <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="w-80 opacity-20 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
        </section>
        <!-- end section qoute & wedding -->

        <!-- section qoute & wedding -->
        <section class="min-h-screen bg-white relative flex flex-col text-black">
            <div class="h-4 bg-gold" />
            <!-- <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]"></div> -->

            <motion.img :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 left-2 w-28" />
            <motion.img :initial="{ opacity: 0, x: -50, y: 0 }" :while-in-view="{ opacity: 1, x: 0, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 right-2 w-28 rotate-90" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 left-2 w-28 scale-y-[-1]" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 right-2 w-28 rotate-90 scale-x-[-1]" />

            <div class="grow py-20 px-4 sm:px-6 md:px-14 font-forum space-y-16 text-center relative z-10">

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <p class="text-primary">Bismillahirrahmanirrahim</p>
                    <p class="text-lg font-semibold">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                    <p class="text-pretty">
                        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan
                        putra-putri kami:
                    </p>
                </motion.div>

                <div>
                    <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/wedding-photos/women.jpg" alt="women" class="h-72 mx-auto rounded-full mb-5" />
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold text-xl text-primary">
                        FITRI CHAIRUNNISA, S.T.P., M.Si.
                    </motion.p>
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                        Putri dari Bapak Ir. H. Rahmadsyah & <br /> Ibu Hj. Prihatin Rahayu, S.H.
                    </motion.p>

                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-primary font-bold text-4xl my-2">
                        &
                    </motion.p>

                    <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/wedding-photos/man.jpg" alt="man" class="h-72 mx-auto rounded-full mb-5" />
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold text-xl text-primary">
                        M. RIDWAN DWI ASTANTO, S.T.P., M.T.
                    </motion.p>
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                        Putra dari Bapak H. Tugimin, S.Pd. & <br /> Ibu Hj. Netti Dewita, A.Ma.Pd.
                    </motion.p>
                </div>
            </div>

            <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="w-80 opacity-20 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
        </section>
        <!-- end section qoute & wedding -->

        <!-- section countdown -->
        <section class="bg-primary relative">
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/wedding-photos/with-love.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />

            <div class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center]" />

            <div class="flex flex-col items-center px-14 py-20 font-forum relative z-10">
                <motion.h4 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-center text-2xl mb-4">
                    Menuju Hari Bahagia
                </motion.h4>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex justify-between w-full px-4 mb-6 gap-4">
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">{{ days }}</p>
                        <p class="leading-none">Hari</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">{{ hours }}</p>
                        <p class="leading-none">Jam</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">{{ minutes }}</p>
                        <p class="leading-none">Menit</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">{{ seconds }}</p>
                        <p class="leading-none">Detik</p>
                    </div>
                </motion.div>

                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-2">
                    MINGGU, 01 JUNI 2025
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <UButton class="mx-auto rounded-full" @click="addToCalendarAction">Save The Date</UButton>
                </motion.div>
            </div>
        </section>
        <!-- end section countdown -->

        <!-- section location -->
        <section class="bg-white min-h-96 font-forum text-black relative overflow-hidden">
            <div class="h-4 bg-gold" />
            <!-- <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]"></div> -->

            <motion.img :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 left-2 w-28" />
            <motion.img :initial="{ opacity: 0, x: -50, y: 0 }" :while-in-view="{ opacity: 1, x: 0, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 right-2 w-28 rotate-90" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 left-2 w-28 scale-y-[-1]" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 right-2 w-28 rotate-90 scale-x-[-1]" />

            <div class="flex flex-col py-20 px-10 space-y-10 text-center">
                <!-- akad nikah -->
                <div class="rounded-full border-2 border-gold shadow-lg py-28 px-8 relative">
                    <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex items-center justify-center px-5 mb-4 gap-2">
                        <img src="/javanese/divider_part.svg" class="w-18 rotate-180">
                        <h4 class="text-2xl font-semibold text-nowrap text-center">
                            Akad Nikah
                        </h4>
                        <img src="/javanese/divider_part.svg" class="w-18">
                    </motion.div>

                    <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-4">
                        <p class="font-bold text-primary text-xl mb-1"> Minggu</p>
                        <p class="text-6xl">01</p>
                        <p>Juni 2025</p>
                        <p>08:00 WIB - Selesai</p>
                    </motion.div>

                    <div>
                        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold">
                            di Ballroom Hotel Harper
                        </motion.p>
                        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-pretty mb-2">
                            JI. R. Sukamto No. 20, 20 Ilir D II, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30128
                        </motion.p>

                        <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/qr_loc.svg" alt="qr location" class="w-16 mx-auto mb-6" />

                        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                            <UButton class="mx-auto rounded-full" :to="data.venue.link" external target="_blank">Lihat Maps</UButton>
                        </motion.div>

                    </div>

                    <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="w-64 opacity-20 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
                </div>
            </div>
        </section>
        <!-- end section location -->
        <!-- section location 2 -->
        <section class="bg-white min-h-96 font-forum text-black relative overflow-hidden">
            <div class="h-4 bg-gold" />
            <!-- <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]"></div> -->

            <motion.img :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 left-2 w-28" />
            <motion.img :initial="{ opacity: 0, x: -50, y: 0 }" :while-in-view="{ opacity: 1, x: 0, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 right-2 w-28 rotate-90" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 left-2 w-28 scale-y-[-1]" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 right-2 w-28 rotate-90 scale-x-[-1]" />

            <div class="flex flex-col py-20 px-10 space-y-10 text-center">


                <!-- resepsi -->
                <div class="rounded-full border-2 border-gold shadow-lg py-28 px-8 relative">
                    <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex items-center justify-center px-5 mb-4 gap-2">
                        <img src="/javanese/divider_part.svg" class="w-18 rotate-180">
                        <h4 class="text-2xl font-semibold text-nowrap text-center">
                            Resepsi
                        </h4>
                        <img src="/javanese/divider_part.svg" class="w-18">
                    </motion.div>

                    <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-4">
                        <p class="font-bold text-primary text-xl mb-1"> Minggu</p>
                        <p class="text-6xl">01</p>
                        <p>Juni 2025</p>
                        <p>10:00 WIB - Selesai</p>
                    </motion.div>

                    <div>
                        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold">
                            di Ballroom Hotel Harper
                        </motion.p>
                        <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-pretty mb-2">
                            JI. R. Sukamto No. 20, 20 Ilir D II, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30128
                        </motion.p>

                        <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/qr_loc.svg" alt="qr location" class="w-16 mx-auto mb-6" />

                        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                            <UButton class="mx-auto rounded-full" :to="data.venue.link" external target="_blank">Lihat Maps</UButton>
                        </motion.div>

                    </div>

                    <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="w-64 opacity-20 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
                </div>
            </div>
        </section>
        <!-- end section location -->

        <!-- section gallery -->
        <section class="bg-white min-h-screen relative overflow-hidden font-forum">
            <!-- <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]" /> -->

            <div class="h-4 bg-gold" />

            <motion.img :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 left-2 w-28" />
            <motion.img :initial="{ opacity: 0, x: -50, y: 0 }" :while-in-view="{ opacity: 1, x: 0, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute top-6 right-2 w-28 rotate-90" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 left-2 w-28 scale-y-[-1]" />
            <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/pattern_corner.svg" class="absolute bottom-2 right-2 w-28 rotate-90 scale-x-[-1]" />

            <div class="py-32 px-4">
                <h3 class="text-3xl font-bold text-primary text-center mb-6">Our Gallery</h3>

                <div class="grid grid-cols-2 gap-3">
                    <img v-for="(src, index) in images" :key="index + src" class="aspect-[9/16] rounded-lg object-cover object-center" :src="src" alt="" @click="() => showImg(index)">
                </div>
                <VueEasyLightbox :visible="visibleRef" :imgs="images" :index="indexRef" @hide="onHide" />
            </div>
        </section>
        <!-- end section gallery -->

        <!-- section wedding gift -->
        <section class="bg-white min-h-96 font-forum text-black relative overflow-hidden flex flex-col">
            <div class="h-4 bg-gold" />
            <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex flex-col py-20 px-10 text-center">
                <div class="flex items-center gap-2 justify-center mb-4">
                    <img src="/javanese/divider_part.svg" class="w-16 lg:w-28 rotate-180">
                    <h4 class="text-2xl font-semibold text-nowrap">
                        Wedding Gift
                    </h4>
                    <img src="/javanese/divider_part.svg" class="w-16 lg:w-28">
                </div>

                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-pretty mb-6">
                    Doa restu Bapak/Ibu merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <UModal title="Wedding Gift">
                        <UButton class="mx-auto rounded-full">Amplop Digital</UButton>
                        <template #body>
                            <div class="flex items-center gap-8 mb-8">
                                <div class="w-24">
                                    <img class="block w-full aspect-auto" src="/logos/bca.png" alt="">
                                </div>
                                <div>
                                    <div class="text-lg font-semibold">FITRI CHAIRUNNISA</div>
                                    <div class="text-(--ui-text-muted)">Bank Central Asia (BCA)</div>
                                    <div class="font-semibold">0954438038</div>
                                    <UButton class="mx-auto rounded-full" @click="copyToClipboard('0954438038')">Copy</UButton>
                                </div>
                            </div>
                            <div class="flex items-center gap-8">
                                <div class="w-24">
                                    <img class="block w-full aspect-auto" src="/logos/mandiri.png" alt="">
                                </div>
                                <div>
                                    <div class="text-lg font-semibold">M RIDWAN DWI ASTANTO</div>
                                    <div class="text-(--ui-text-muted)">Bank Mandiri</div>
                                    <div class="font-semibold">1080021475729</div>
                                    <UButton class="mx-auto rounded-full" @click="copyToClipboard('1080021475729')">Copy</UButton>
                                </div>
                            </div>
                        </template>
                    </UModal>
                </motion.div>

                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="absolute top-1/2 left-0 -translate-1/2 opacity-20 w-56 z-0" />
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-20 w-56 z-0" />
            </motion.div>
        </section <!-- end section wedding gift -->

        <!-- section ucapan & rsvp -->
        <section class="bg-primary relative font-forum overflow-hidden">

            <!-- <div class="h-4 bg-gold" /> -->
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />

            <motion.div :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center] flex flex-col items-center justify-center">
                <div class="uppercase bg-primary text-amber-400 font-bold relative z-50 px-4 py-1 text-lg rounded-full border-gold border-3">
                    Ucapan & rsvp
                </div>
            </motion.div>

            <div class="flex flex-col items-center px-10 pt-4 pb-10 relative z-10 text-center text-white">
                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-4">
                    Berikan ucapan terbaik untuk Kedua Mempelai & Konfirmasi Kehadiran
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="space-y-2 w-full mb-4">
                    <UFormField label="Nama" required :ui="{ label: '!text-white', root: 'w-full' }">
                        <UInput v-model="state.name" placeholder="Masukkan nama kamu" class="w-full" />
                    </UFormField>

                    <UFormField label="Ucapan & Doa" required :ui="{ label: '!text-white', root: 'w-full' }">
                        <UTextarea v-model="state.message" placeholder="Masukkan ucapan & kamu" class="w-full" />
                    </UFormField>

                    <UFormField label="Konfirmasi Kehadiran" required :ui="{ label: '!text-white', root: 'w-full' }">
                        <URadioGroup v-model="state.confirmation" orientation="horizontal" indicator="hidden" variant="card" :items="items" :ui="{ label: '!text-white' }" />
                    </UFormField>

                    <UFormField v-if="state.confirmation === 'Hadir'" required :ui="{ label: '!text-white', root: 'w-full' }">
                        <UButtonGroup class="w-full">
                            <USelect v-model="state.tamu" color="neutral" variant="subtle" :items="[1, 2, 3, 4, 5]" class="w-full" :ui="{ base: 'pl-[100px]', leading: 'pointer-events-none bg-gold rounded-l-md px-2' }" :default-value="1">
                                <template #leading>
                                    <p class="text-sm">
                                        Jumlah Tamu
                                    </p>
                                </template>
                            </USelect>
                        </UButtonGroup>
                    </UFormField>
                </motion.div>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <UButton class="rounded-full w-full" block :loading="loading" @click="submitMessage">Kirim</UButton>
                </motion.div>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mt-4 overflow-y-auto h-48 w-full flex flex-col space-y-2">
                    <template v-for="(message, index) in (messages?.messages || [])" :key="index">
                        <div class="flex gap-2 font-sans border-b border-b-gray-200 py-2">
                            <UIcon name="i-lucide-user-circle" class="size-8 shrink-0" />
                            <div class="text-left">
                                <h5 class="font-bold">{{ message.name }}</h5>
                                <p class="text-xs">{{ new Date(message.created_at).toLocaleString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}</p>
                                <p class="text-sm">
                                    {{ message.message }}
                                </p>
                            </div>
                        </div>
                    </template>
                </motion.div>
            </div>
        </section>
        <!-- end section ucapan & rsvp -->

        <!-- section thanks -->
        <section class="bg-primary relative font-forum text-gold overflow-hidden">
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />
            <motion.div :initial="{ opacity: 0, y: -50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center] flex flex-col items-center justify-center" />

            <div class="relative z-10 py-16 px-4 md:px-14 text-center">
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/logo_emblem.svg" alt="logo" class="mb-8 w-40 mx-auto" />

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-16">
                    <p class="mb-1 text-pretty">
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
                        untuk
                        memberikan doa restu kepada putra-putri kami.
                    </p>
                    <p class="font-bold text-xl text-white">Wassalamu’alaikum Wr. Wb.</p>
                </motion.div>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <p class="mb-4">Kami yang mengundang</p>

                    <div class="grid grid-cols-2">
                        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-center">
                            <p class="text-sm mb-1">Keluarga Besar</p>
                            <p class="font-bold">Ir. H. Rahmadsyah <br> Hj. Prihatin Rahayu, S.H.</p>
                        </motion.div>
                        <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-center">
                            <p class="text-sm mb-1">Keluarga Besar</p>
                            <p class="font-bold">H. Tugimin, S.Pd. <br> Hj. Netti Dewita, A.Ma.Pd.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center] flex flex-col items-center justify-center" />
        </section>
        <!-- end section thanks -->

    </main>
</template>