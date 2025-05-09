export default function <T>(content: T extends string ? T : string) {
    const toast = useToast()

    navigator.clipboard.writeText(content)

    toast.add({
        color: 'success',
        icon: 'i-lucide-clipboard-copy',
        description: 'Copied to clipboard'
    })
}