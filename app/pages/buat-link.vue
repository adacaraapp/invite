<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const colorMode = useColorMode()
colorMode.preference = 'light'

const guestName = ref('')
const baseLink = 'https://icha-ridwan.sekeco.work?kepada='

const generatedLink = ref('')

const { copy } = useClipboard()

const generateLink = () => {
    if (guestName.value.trim()) {
        const param = encodeURIComponent(guestName.value.trim())
        generatedLink.value = `${baseLink}${param}`
    }
}

const generatedShareText = computed(() => {
    return `Assalamu'alaikum Wr. Wb

Yth. ${guestName.value.trim()}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:

Icha & Ridwan

Berikut link undangan kami untuk info lengkap dari acara bisa kunjungi:
 
${generatedLink.value}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini. Terima kasih banyak atas perhatiannya.

Wassalamu'alaikum Wr. Wb.
Terima Kasih.`
})

const copyLink = () => {
    if (generatedLink.value) copy(generatedLink.value)
    useToast().add({
        title: 'Berhasil dicopy'
    })
}

const shareToMedia = () => {
    if (navigator.share) {
        navigator.share({
            title: 'Undangan Pernikahan Icha & Ridwan',
            text: generatedShareText.value,
            url: generatedLink.value
        })
    } else {
        useToast().add({
            title: 'Browser tidak support Web Share API',
            type: 'error'
        })
    }
}
</script>

<template>
    <div class="absolute bg-white inset-0">
        <UContainer class="py-10 max-w-xl mx-auto text-center">
            <h2 class="text-2xl font-bold text-primary mb-4">Icha & Ridwan</h2>

            <UForm @submit.prevent="generateLink" :state="{}">
                <UFormField label="Nama Tamu" class="mb-4">
                    <UInput v-model="guestName" placeholder="Masukkan nama tamu" class="w-full" size="xl" />
                </UFormField>

                <UButton type="submit" block color="primary" icon="i-heroicons-link" size="xl">
                    Buat Link Undangan
                </UButton>
            </UForm>

            <div v-if="generatedLink" class="mt-6">
                <UFormField label="Hasil Generate" class="mb-4">
                    <UInput v-model="generatedLink" readonly class="w-full" size="xl" />
                </UFormField>

                <div class="flex flex-col gap-4">
                    <div class="grid grid-cols-2 gap-4">
                        <UButton :to="generatedLink" target="_blank" icon="i-heroicons-arrow-right" block size="lg">
                            Buka Link
                        </UButton>
                        <UButton @click="copyLink" icon="i-heroicons-clipboard" block size="lg">
                            Salin Link
                        </UButton>
                    </div>
                    <br />
                    <UButton icon="i-heroicons-clipboard" color="neutral" block size="lg" @click="copy(generatedShareText)">
                        Salin Teks Undangan
                    </UButton>
                    <UButton :to="`https://wa.me/?text=${encodeURIComponent(generatedShareText)}`" target="_blank" icon="i-simple-icons-whatsapp" color="success" block size="lg">
                        Kirim Undangan via WhatsApp
                    </UButton>
                    <UButton icon="i-heroicons-share" block size="lg" color="info" @click="shareToMedia">
                        Bagikan ke Media Sosial Lainnya
                    </UButton>
                </div>
            </div>
        </UContainer>
    </div>
</template>