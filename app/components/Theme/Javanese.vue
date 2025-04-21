<script lang="ts" setup>
import { motion } from "motion-v"

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
        name: 'Nama Tamu'
    },
    venue: {
        link: 'https://maps.app.goo.gl/A3XDH6k5GNhBBUeH6'
    },
    date: '2025-06-01'
}

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

async function submitMessage() {
    // save to json in "icha-ridwan".json
    console.log(state)
}
</script>

<template>
    <main :class="['light', isOpen ? '' : 'h-screen overflow-hidden']">

        <!-- welcome section -->
        <section :class="['absolute w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-lg left-1/2 -translate-x-1/2 transition-all duration-1000 z-50 shadow-2xl text-gold', isOpen ? '-translate-y-full' : '']">
            <div class="min-h-screen w-full bg-primary flex flex-col justify-end items-center relative py-28 px-10">
                <img src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply opacity-75 absolute size-full object-cover top-0 left-0 z-0 pointer-events-none">

                <div class="h-full flex flex-col justify-end items-center z-10">
                    <motion.img :initial="{ opacity: 0 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" src="/javanese/logo_emblem.svg" alt="logo" class="absolute w-80 top-18 mask-b-from-30% mask-b-to-100% z-50 pointer-events-none" />
                    <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-2 font-forum">WALIMATUL ‘URSY</motion.p>
                    <motion.h1 :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="flex items-center gap-2 mb-8 font-black uppercase font-serif text-white">
                        <span class="text-4xl">{{ data.bride.name }}</span>
                        <span class="text-2xl">&</span>
                        <span class="text-4xl">{{ data.groom.name }}</span>
                    </motion.h1>
                    <motion.div :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="space-y-4">
                        <div class="flex flex-col text-center mb-3 font-forum">
                            <span>Kepada Yth.</span>
                            <span>Bapak/Ibu/Saudara/i</span>
                            <span><strong>{{ data.recipient.name }}</strong></span>
                        </div>
                        <UButton class="mx-auto rounded-full" block @click="() => { isOpen = true }">Open invitation</UButton>
                    </motion.div>
                </div>
            </div>
        </section>
        <!-- end welcome section -->

        <!-- section home -->
        <section class="bg-primary min-h-[800px] h-screen relative text-gold font-forum overflow-hidden">
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />
            <div class="flex flex-col justify-end items-center py-28 px-10 relative">
                <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-2">THE WEDDING OF</motion.p>
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, scale: 1 }" src="/javanese/logo.svg" class="w-80 mb-5" alt="logo" />
                <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-2 text-white font-bold text-xl">MINGGU, 01 JUNI 2025</motion.p>
                <motion.p :initial="{ opacity: 0, y: 50 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, y: 0 }" class="mb-32">Ballroom Hotel Harper</motion.p>
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :transition="{ duration: 1 }" :while-in-view="{ opacity: 1, scale: 1 }" src="/javanese/logo_emblem.svg" alt="logo emblem" />
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

            <div class="grow py-20 px-14 font-forum space-y-16 text-center relative z-10">
                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <p class="text-pretty">
                        "Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak
                        (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika
                        mereka miskin, Allah akan memampukan mereka dengan karunia-Nya. dan Allah Maha Luas
                        (pemberian-Nya) lagi Maha mengetahui."
                    </p>
                    <motion.p class="text-primary font-bold">QS An-Nur: 32</motion.p>
                </motion.div>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <p class="text-primary">Bismillahirrahmanirrahim</p>
                    <p class="text-lg font-semibold">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                    <p class="text-pretty">
                        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:
                    </p>
                </motion.div>

                <div>
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold text-xl text-primary">
                        FITRI CHAIRUNNISA, S.T.P., M.Si.
                    </motion.p>
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                        Putri dari Bapak Ir. H. Rahmadsyah & Ibu Hj. Prihatin Rahayu, S.H.
                    </motion.p>

                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-primary font-bold text-4xl my-2">
                        &
                    </motion.p>

                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold text-xl text-primary">
                        M. RIDWAN DWI ASTANTO, S.T.P., M.T.
                    </motion.p>
                    <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                        Putra dari Bapak H. Tugimin, S.Pd. & Ibu Hj. Netti Dewita, A.Ma.Pd.
                    </motion.p>
                </div>
            </div>

            <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="w-80 opacity-20 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
        </section>
        <!-- end section qoute & wedding -->

        <!-- section countdown -->
        <section class="bg-primary relative">
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />

            <div class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center]" />

            <div class="flex flex-col items-center px-14 py-20 font-forum relative z-10">
                <motion.h4 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-center text-2xl mb-4">
                    Menuju Hari Bahagia
                </motion.h4>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex justify-between w-full px-16 mb-6">
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">00</p>
                        <p class="leading-none">Hari</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">00</p>
                        <p class="leading-none">Jam</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">00</p>
                        <p class="leading-none">Menit</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="leading-none font-semibold text-3xl font-sans">00</p>
                        <p class="leading-none">Detik</p>
                    </div>
                </motion.div>

                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-2">
                    MINGGU, 01 JUNI 2025
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <UButton class="mx-auto rounded-full">Save The Date</UButton>
                </motion.div>
            </div>
        </section>
        <!-- end section countdown -->

        <!-- section location -->
        <section class="bg-white min-h-96 font-forum text-black relative overflow-hidden">
            <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]" />

            <div class="flex flex-col py-20 px-10 text-center">
                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex items-center mb-4">
                    <img src="/javanese/divider_part.svg" class="w-28 rotate-180">
                    <h4 class="text-3xl font-semibold text-nowrap">
                        Denah Lokasi
                    </h4>
                    <img src="/javanese/divider_part.svg" class="w-28">
                </motion.div>

                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold text-primary text-xl mb-2">
                    Minggu, 01 Juni 2025
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="grid grid-cols-2 divide-x mb-10">
                    <div>
                        <p class="text-primary">Akad Nikah</p>
                        <p>08:00 WIB - Selesai</p>
                    </div>
                    <div>
                        <p class="text-primary">Resepsi</p>
                        <p>10:00 WIB - Selesai</p>
                    </div>
                </motion.div>

                <motion.img :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" src="/javanese/qr_loc.svg" alt="qr location" class="w-16 mx-auto mb-2" />

                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="font-bold">
                    di Ballroom Hotel Harper
                </motion.p>
                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-pretty mb-6">
                    JI. R. Sukamto No. 20, 20 Ilir D II, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30128
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <UButton class="mx-auto rounded-full" :to="data.venue.link" external target="_blank">Lihat Maps</UButton>
                </motion.div>
            </div>
        </section>
        <!-- end section location -->

        <!-- section ucapan & rsvp -->
        <section class="bg-primary relative font-forum">
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />

            <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center] flex flex-col items-center justify-center">
                <div class="uppercase bg-primary font-bold relative z-50 px-4 py-1 text-lg rounded-full border-gold border-3">
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
                    <UButton class="rounded-full w-full" block>Kirim</UButton>
                </motion.div>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mt-4 overflow-y-auto h-48 w-full flex flex-col space-y-2">
                    <div class="flex gap-2 font-sans">
                        <UIcon name="i-lucide-user-circle" class="size-8 shrink-0" />
                        <div class="text-left">
                            <h5 class="font-bold">Test</h5>
                            <p class="text-xs">13-04-2025 17:45</p>
                            <p class="text-sm">
                                Selamat fida dan calon suami Semoga dilancarkan segala rangkaian acaranya besok Dijadikan keluarga yang sakinah mawadah warahmah wabarokah, enggal diparingi momongan 🤲🏻🤲🏻🤲🏻🤭
                            </p>
                        </div>
                    </div>
                    <div class="flex gap-2 font-sans">
                        <UIcon name="i-lucide-user-circle" class="size-8 shrink-0" />
                        <div class="text-left">
                            <h5 class="font-bold">Test</h5>
                            <p class="text-xs">13-04-2025 17:45</p>
                            <p class="text-sm">
                                Selamat fida dan calon suami Semoga dilancarkan segala rangkaian acaranya besok Dijadikan keluarga yang sakinah mawadah warahmah wabarokah, enggal diparingi momongan 🤲🏻🤲🏻🤲🏻🤭
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
        <!-- end section ucapan & rsvp -->

        <!-- section wedding gift -->
        <section class="bg-white min-h-96 font-forum text-black relative overflow-hidden">
            <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]" />

            <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="flex flex-col py-20 px-10 text-center">
                <div class="flex items-center mb-4">
                    <img src="/javanese/divider_part.svg" class="w-28 rotate-180">
                    <h4 class="text-3xl font-semibold text-nowrap">
                        Wedding Gift
                    </h4>
                    <img src="/javanese/divider_part.svg" class="w-28">
                </div>

                <motion.p :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="text-pretty mb-6">
                    Mungkin karena jarak, waktu ataupun keadaan yang menghalangi untuk ikut hadir dalam
                    momen bahagia kami, Silakan klik tombol di bawah untuk mengirimkan kado/hadiah.
                </motion.p>

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }">
                    <UModal title="Wedding Gift">
                        <UButton class="mx-auto rounded-full">Amplop Digital</UButton>
                        <template #body>
                            <div class="flex items-center gap-8">
                                <img class="block h-12 aspect-auto" src="/logos/mandiri.png" alt="">
                                <div>
                                    <div class="text-lg font-semibold">M RIDWAN DWI ASTANTO</div>
                                    <div class="text-(--ui-text-muted)">Bank Mandiri</div>
                                    <div class="font-semibold">1080021475729</div>
                                </div>
                            </div>
                        </template>
                    </UModal>
                </motion.div>

                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="absolute top-1/2 left-0 -translate-1/2 opacity-20 w-56 z-0" />
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 0.2, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/pattern2.svg" class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-20 w-56 z-0" />
            </motion.div>
        </section>
        <!-- end section wedding gift -->

        <!-- section thanks -->
        <section class="bg-primary relative font-forum text-gold">
            <motion.img :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 1 }" src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none" />

            <div class="relative z-10 py-16 px-14 text-center">
                <motion.img :initial="{ opacity: 0, scale: 0.8 }" :while-in-view="{ opacity: 1, scale: 1 }" :transition="{ duration: 1 }" src="/javanese/logo_emblem.svg" alt="logo" class="mb-8" />

                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1 }" class="mb-16">
                    <p class="mb-1 text-pretty">
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra-putri kami.
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