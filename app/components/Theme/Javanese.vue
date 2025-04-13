<script lang="ts" setup>
const data = {
    groom: {
        name: 'Budi',
        full_name: 'Budi Santoso'
    },
    bride: {
        name: 'Dewi',
        full_name: 'Dewi Janti',
    },
    recipient: {
        name: 'Nama Tamu'
    },
}

const items = ref<RadioGroupItem[]>(['Hadir', 'Tidak Hadir'])
const confimation = ref('')

const tamuOption = ref([1, 2, 3, 4])
const tamu = ref(1)

const isOpen = ref(false)
</script>

<template>
    <main class="light">

        <!-- welcome section -->
        <section :class="['min-h-screen flex flex-col justify-end bg-primary py-28 px-10 items-center absolute w-full left-1/2 -translate-x-1/2 max-w-lg transition-all duration-1000 z-50 shadow-2xl', isOpen ? '-translate-y-full' : '']">
            <img src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply opacity-75 absolute size-full object-cover top-0 lef-0 z-0 pointer-events-none"/>
            
            <div class="h-full flex flex-col justify-end items-center z-10">
                <img src="/javanese/logo_emblem.svg" alt="logo" class="absolute w-80 top-18 mask-b-from-30% mask-b-to-100% z-50 pointer-events-none"/>
                <p class="mb-2 font-forum">WALIMATUL ‘URSY</p>
                <h1 class="flex items-center gap-2 mb-8 font-black uppercase font-serif">
                    <span class="text-4xl">{{ data.groom.name }}</span>
                    <span class="text-2xl">&</span>
                    <span class="text-4xl">{{ data.bride.name }}</span>
                </h1>
                <div class="space-y-4">
                    <div class="flex flex-col text-center mb-3 font-forum">
                        <span>Kepada Yth.</span>
                        <span>Bapak/Ibu/Saudara/i</span>
                        <span><strong>{{ data.recipient.name }}</strong></span>
                    </div>
                    <UButton class="mx-auto rounded-full" block @click="()=>isOpen=true">Open invitation</UButton>
                </div>
            </div>
        </section>
        <!-- end welcome section -->

        <!-- section home -->
        <section class="bg-primary min-h-screen">
            <div class="flex flex-col justify-end items-center py-28 px-10 relative">
                <p class="mb-2 font-forum">WALIMATUL ‘URSY</p>
                <h1 class="flex items-center gap-2 mb-1 font-black uppercase font-serif">
                    <span class="text-4xl">{{ data.groom.name }}</span>
                    <span class="text-2xl">&</span>
                    <span class="text-4xl">{{ data.bride.name }}</span>
                </h1>
                <p class="font-forum">Ahad, 29 Desember 2024</p>
            </div>
        </section>
        <!-- end section home -->

        <!-- section qoute & wedding -->
         <section class="min-h-screen bg-white relative flex flex-col text-black">
            <div class="h-4 bg-primary"></div>
            <!-- <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]"></div> -->

            <div class="grow  py-20 px-14 font-forum">
                <div class="flex flex-col items-center mb-20">
                    <img src="/javanese/logo2.svg" alt="logo" class="mb-4">
                    <p class="text-sm text-center text-pretty">
                        "Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika mereka miskin, Allah akan memampukan mereka dengan karunia-Nya. dan Allah Maha Luas (pemberian-Nya) lagi Maha mengetahui."
                    </p>
                    <p class="text-primary font-bold">QS An-Nur: 32</p>
                </div>

                <div class="flex flex-col items-center text-center">
                    <p class="text-primary">Bismillahirrahmanirrahim</p>
                    <p class="text-lg font-semibold">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                    <p>
                        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:
                    </p>
                    <img src="/javanese/logo2.svg" alt="logo" class="mb-4">

                    <p class="font-bold text-lg text-primary">
                        FITRI CHAIRUNNISA, S.T.P., M.Si.
                    </p>
                    <p>
                        Putri dari Bapak Ir. H. Rahmadsyah & Ibu Hj. Prihatin Rahayu, S.H.
                    </p>

                    <p class="text-primary font-bold text-4xl my-4">&</p>

                    <p class="font-bold text-lg text-primary">
                        M. RIDWAN DWI ASTANTO, S.T.P., M.T.
                    </p>
                    <p>
                        Putra dari Bapak H. Tugimin, S.Pd. & Ibu Hj. Netti Dewita, A.Ma.Pd.
                    </p>
                </div>
            </div>
            
            <img src="/javanese/pattern2.svg" class="w-80 opacity-20 absolute top-1/2 left-1/2 -translate-1/2"  >
            <!-- <div class="h-4 bg-primary"></div> -->
         </section>
        <!-- end section qoute & wedding -->

        <!-- section countdown -->
         <section class="bg-primary relative">
            <img src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none"/>

            <div class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center]"></div>

            <div class="flex flex-col items-center px-14 py-20 font-forum relative z-10">
                <h4 class="text-center text-2xl mb-4">Menuju Hari Bahagia</h4>

                <div class="flex justify-between w-full px-16 mb-6">
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
                </div>
                <p class="mb-2">MINGGU, 01 JUNI 2025</p>

                <UButton class="mx-auto rounded-full">Save The Date</UButton>
            </div>
         </section>
        <!-- end section countdown -->

         <!-- section location -->
         <section class="bg-white min-h-96 font-forum text-black relative overflow-hidden">
            <div class="h-[32px] bg-[url('/javanese/part_pattern_border.svg')] bg-repeat-x bg-size-[auto_32px]"></div>

            <div class="flex flex-col py-20 px-10 text-center">
                <div class="flex items-center mb-4">
                    <img src="/javanese/divider_part.svg" class="w-28 rotate-180">
                    <h4 class="text-3xl font-semibold text-nowrap">
                        Denah Lokasi
                    </h4>
                    <img src="/javanese/divider_part.svg" class="w-28">
                </div>

                <p class="font-bold text-primary text-xl mb-2">Minggu, 01 Juni 2025</p>
                <div class="grid grid-cols-2 divide-x mb-4">
                    <div>
                        <p class="text-primary">Akad Nikah</p>
                        <p>08:00 WIB - Selesai</p>
                    </div>
                    <div>
                        <p class="text-primary">Resepsi</p>
                        <p>10:00 WIB - Selesai</p>
                    </div>
                </div>

                <p class="font-bold">di Ballroom Hotel Harper</p>
                <p class="text-pretty mb-6">JI. R. Sukamto No. 20, 20 Ilir D II, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30128</p>
                <UButton class="mx-auto rounded-full">Lihat Maps</UButton>

                <img src="/javanese/pattern2.svg" class="absolute top-1/2 left-0 -translate-1/2 opacity-20 w-56">
                <img src="/javanese/pattern2.svg" class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-20 w-56">
            </div>
         </section>
         <!-- end section location -->

         <!-- section ucapan & rsvp -->
         <section class="bg-primary relative font-forum">
            <img src="/javanese/cloud-100.jpg" alt="background" class="mix-blend-multiply absolute size-full object-cover opacity-75 top-0 lef-0 z-0 pointer-events-none"/>

            <div class="h-24 bg-[url(/javanese/pattern1.svg)] bg-size-[400px] bg-[bottom_center] flex flex-col items-center justify-center">
                <div class="uppercase bg-primary font-bold relative z-50 px-4 py-1 text-lg rounded-full border-gold border-3">
                    ucapan & rsvp
                </div>
            </div>

            <div class="flex flex-col items-center px-14 pt-4 pb-10 relative z-10 text-center text-white">
                <p class="mb-4">Berikan ucapan terbaik untuk Kedua Mempelai & Konfirmasi Kehadiran</p>

                <div class="space-y-2 w-full mb-4">
                    <UFormField label="Nama" required :ui="{label:'!text-white', root: 'w-full'}">
                        <UInput placeholder="Masukkan nama kamu" class="w-full" />
                    </UFormField>

                    <UFormField label="Ucapan & Doa" required :ui="{label:'!text-white', root: 'w-full'}">
                        <UTextarea placeholder="Masukkan ucapan & kamu" class="w-full" />
                    </UFormField>

                    <UFormField label="Konfirmasi Kehadiran" required :ui="{label:'!text-white', root: 'w-full'}">
                        <URadioGroup v-model="confimation" orientation="horizontal" indicator="hidden" variant="card" :items="items" :ui="{ label:'!text-white'}" />
                    </UFormField>

                    <UFormField v-if="confimation === 'Hadir'" required :ui="{label:'!text-white', root: 'w-full'}">
                        <UButtonGroup class="w-full">
                            <USelect color="neutral" variant="subtle" v-model="tamu" :items="tamuOption" class="w-full" :ui="{ root:'w-full', base: 'pl-[100px]', leading: 'pointer-events-none bg-gold rounded-l-md px-2'}" default-value="1">
                                <template #leading>
                                    <p class="text-sm">
                                        Jumlah Tamu
                                    </p>
                                </template>
                            </USelect>
                        </UButtonGroup>
                    </UFormField>
                </div>

                <UButton class="mx-auto rounded-full" block>Kirim</UButton>
            </div>
         </section>
         <!-- end section ucapan & rsvp -->

    </main>
</template>