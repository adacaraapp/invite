<script setup>
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const { data } = await useLazyFetch(`/api/client/${route.params.slug}`)

useHead({
    title: data.value?.head.title,
    link: [
        { rel: 'icon', type: 'image/png', href: data.value?.head.logo }
    ]
})

useSeoMeta({
    title: data.value?.head.title,
    description: data.value?.head.description,
    ogTitle: data.value?.head.title,
    ogDescription: data.value?.head.description,
    ogImage: data.value?.head.cover
})

definePageMeta({
    colorMode: 'light',
})

const guestName = ref('')
const baseLink = `https://${window?.location?.hostname}/${route.params.slug}?kepada=`

const generatedLink = ref('')

const { copy } = useClipboard()

const generateLink = () => {
    if (guestName.value.trim()) {
        const param = encodeURIComponent(guestName.value.trim())
        generatedLink.value = `${baseLink}${param}`
    }
}

const generatedShareText = computed(() => {
    return `*Assalamu'alaikum Wr. Wb*

Yth. ${guestName.value.trim()}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:

_*${data.value.groom.full_name}*_
_*&*_ 
_*${data.value.bride.full_name}*_

Berikut link undangan kami:
${generatedLink.value}

Suatu kebahagiaan bagi kami, atas segala doa restu dan perkenan Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan ini.

Terima kasih banyak atas perhatiannya.

*Wassalamu'alaikum Wr. Wb.*

Hormat kami,
*${data.value.groom.short_name} & ${data.value.bride.short_name}*
${data.value.families.map(family => `*${family}*`).join('\n')}`
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
            title: `Undangan Pernikahan ${data.value.groom.short_name} & ${data.value.bride.short_name}`,
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

            <div class="bg-amber-50 p-8 size-36 rounded-full mx-auto mb-6">
                <img :src="data.head.logo" alt="" class="w-full h-full object-contain" />
            </div>

            <h2 class="text-2xl font-bold text-primary mb-4">{{ data.head.title }}</h2>

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