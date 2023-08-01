import server from '@/api/server'
import { ref } from 'vue'

export default function languagesService() {
    const isLoading = ref(false)

    async function create(payload) {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/languages', payload).finally(() => {
            isLoading.value = false
        })
    }

    return {
        create,
    }
}
