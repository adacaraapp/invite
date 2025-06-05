<script lang="ts" setup>
const props = defineProps<{
    data?: Record<string, any>
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
</script>

<template>
    <main class="bg-orange-50 h-screen">
        <section id="cover" class="h-screen grid place-items-center">
            <pre>
                {{ data }}
            </pre>
            <!--  -->
        </section>
        <section id="title">
            <!--  -->
        </section>
        <section id="prologue">
            <!--  -->
        </section>
        <section id="brides">
            <!--  -->
        </section>
        <section id="countdown">
            <!--  -->
        </section>
        <section id="held">
            <!--  -->
        </section>
        <section id="gallery">
            <!--  -->
        </section>
        <section id="gift">
            <!--  -->
        </section>
        <section id="messages">
            <!--  -->
        </section>
        <section id="epilogue">
            <!--  -->
        </section>
    </main>
</template>