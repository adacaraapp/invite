<script lang="ts" setup>
const route = useRoute()

const { data, status } = await useFetch(`/api/client/${route.params.slug}`)

const themes = {
    ethnic: resolveComponent('ThemeEthnic'),
    minimalist: resolveComponent('ThemeJavanese'),
}

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
</script>

<template>
    <div>
        <UContainer v-if="data" class="h-screen max-w-lg">
            <component :is="themes[data.theme]" :data="data" />
        </UContainer>
        <div v-else class="grid place-items-center h-screen">
            Loading
        </div>
    </div>
</template>