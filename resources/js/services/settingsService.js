import server from '@/api/server'
import { ref } from 'vue'

export default function settingsService() {
    const isLoading = ref(false)

    async function update(payload) {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/settings/update', payload).finally(() => {
            isLoading.value = false
        })
    }

    async function create(payload) {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/settings/locale', payload).finally(() => {
            isLoading.value = false
        })
    }

    return {
        update,
        create,
    }
}
