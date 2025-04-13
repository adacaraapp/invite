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
</script>

<template>
    <main>
        <section class="min-h-screen grid place-items-center">
            <div></div>
            <h1 class="flex flex-col items-center gap-2">
                <span class="text-4xl mb-2">{{ data.groom.name }}</span>
                <span class="text-2xl">&</span>
                <span class="text-4xl">{{ data.bride.name }}</span>
            </h1>
            <div class="space-y-4">
                <div class="flex flex-col text-center">
                    <span>Kepada Yth.</span>
                    <span>Bapak/Ibu/Saudara/i</span>
                    <span><strong>{{ data.recipient.name }}</strong></span>
                </div>
                <UButton class="mx-auto" block>Open invitation</UButton>
            </div>
        </section>
    </main>
</template>