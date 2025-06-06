<script lang="ts" setup>
const props = defineProps<{
    data?: any
}>()

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
const isOpen = ref(false)

// Audio controls
const audio = ref()
const audioPaused = ref(true)

function playAudio() {
    // You can add audio file here if needed
    // audio.value = new Audio('/themes/ethnic/music.mp3')
    // audio.value.loop = true;
    // audio.value.play();
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
    <main :class="['bg-orange-50 font-libre', isOpen ? '' : 'h-screen overflow-hidden']">

        <UButton @click="() => {
            isOpen = false
        }" class="fixed bottom-10 right-1/4">reset</UButton>

        <!-- Audio Toggle Button -->
        <button v-if="isOpen"
            class="fixed z-40 right-4 bottom-4 bg-ethnic-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
            @click="toggleAudio">
            <svg v-if="!audioPaused" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2l4.383-3.184zm2.617 0a1 1 0 011.617.816v12a1 1 0 01-1.617.816L7.617 13H6a1 1 0 01-1-1V8a1 1 0 011-1h1.617L12 3.076z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2l4.383-3.184zM15 8.5a1 1 0 01-2 0V8a1 1 0 112 0v.5zm0 4a1 1 0 01-2 0v-.5a1 1 0 112 0V12.5z" />
            </svg>
        </button>

        <section id="cover"
            :class="['h-screen absolute w-full mx-auto sm:px-6 lg:px-8 max-w-lg left-1/2 -translate-x-1/2 transition-all duration-[2000ms] z-50', isOpen ? '-translate-y-full opacity-0' : 'opacity-100']">
            <div class="flex flex-col bg-orange-50 items-center h-full py-32 px-10 ">
                <img src="/themes/ethnic/flower1.png" alt="flower"
                    class="mix-blend-multiply opacity-35 absolute top-0 -translate-y-3/5 w-4/5 left-1/2 -translate-x-1/2">
                <img src="/client/umu-shidqi/logo.png" alt="logo" class="relative -top-10 w-32">

                <div class="text-center">
                    <h1 class="text-2xl font-bold font-berkshire text-ethnic-primary tracking-[8px]">
                        {{ data?.bride?.short_name || 'BRIDE' }}
                        <span>&</span>
                        {{ data?.groom?.short_name || 'GROOM' }}
                    </h1>
                    <p class="text-ethnic-secondary font-medium font-mono">MENIKAH | {{ data?.date || 'TBD' }}</p>
                </div>

                <div class="mt-auto text-center">
                    <p class="text-sm mb-3">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                    <p class="font-bold text-2xl">{{ data?.recipient?.name || 'Tamu Undangan' }}</p>
                </div>

                <UButton class="w-auto mt-10 rounded-full bg-ethnic-primary hover:bg-ethnic-primary/50" block
                    @click="() => { isOpen = true; playAudio() }">Open invitation</UButton>
            </div>
        </section>

        <section id="title" class="h-screen py-16 px-10 text-center flex flex-col items-center relative">
            <p>THE WEDDING OF</p>

            <h1 class="text-4xl font-bold font-berkshire flex flex-col items-center mt-8 tracking-[8px]">
                <span>
                    {{ data?.bride?.short_name || 'BRIDE NAME' }}
                </span>
                <span>&</span>
                <span>
                    {{ data?.groom?.short_name || 'GROOM NAME' }}
                </span>
            </h1>

            <p class="text-ethnic-secondary font-medium font-mono mt-8 text-lg">
                MENIKAH | {{ data?.date || 'TBD' }}
            </p>

            <p class="text-sm mt-2">
                {{ data?.venue.address || 'VENUE ADDRESS' }}
            </p>

            <img src="/client/umu-shidqi/logo.png" alt="logo" class="relative mt-16 w-32">
        </section>

        <section id="prologue"
            class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative justify-center">
            <h3 class="text-4xl mb-4 font-berkshire font-bold text-ethnic-secondary">With Love</h3>
            <p class="text-pretty text-sm leading-relaxed">
                "Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak
                (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika
                mereka miskin, Allah akan memampukan mereka dengan karunia-Nya. dan Allah Maha Luas
                (pemberian-Nya) lagi Maha mengetahui."
            </p>
        </section>

        <section id="brides"
            class="h-screen py-20 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            <p class="text-ethnic-secondary text-sm">Bismillahirrahmanirrahim</p>
            <p class="text-lg font-semibold font-berkshire tracking-widest mb-8">Assalamu'alaikum Warahmatullahi
                Wabarakatuh
            </p>
            <p class="text-pretty text-sm leading-loose">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan
                putra-putri kami:
            </p>

            <div class="space-y-8 mt-8">
                <div>
                    <h3 class="text-3xl font-bold mt-8 mb-2">
                        {{ data?.groom?.full_name || 'GROOM FULL NAME' }}
                    </h3>
                    <p class="text-ethnic-secondary">bin {{ data?.groom?.father_name || 'FATHER NAME' }}</p>
                </div>

                <p>dengan</p>

                <div>
                    <h3 class="text-3xl font-bold mt-8 mb-2">
                        {{ data?.bride?.full_name || 'BRIDE FULL NAME' }}
                    </h3>
                    <p class="text-ethnic-secondary">binti. {{ data?.bride?.father_name || 'FATHER NAME' }}</p>
                </div>
            </div>
        </section>
        <section id="countdown"
            class="h-64 py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            countdown
        </section>
        <section id="held"
            class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            held
        </section>
        <section id="gallery"
            class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            <!--  -->
        </section>
        <section id="gift"
            class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            gift
        </section>
        <section id="messages"
            class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            messages
        </section>
        <section id="epilogue"
            class="h-screen py-16 px-10 border-t-8 border-ethnic-primary text-center flex flex-col items-center relative">
            epilogue
        </section>
    </main>
</template>