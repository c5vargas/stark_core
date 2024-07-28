import server from '@/js/api/server'
import { ref } from 'vue'

export default function roleService() {
    const isLoading = ref(false)

    async function get() {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.get('/api/roles').finally(() => {
            isLoading.value = false
        })
    }

    async function create(payload) {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/roles', payload).finally(() => {
            isLoading.value = false
        })
    }

    async function update(payload) {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/roles/update', payload).finally(() => {
            isLoading.value = false
        })
    }

    return {
        get,
        create,
        update,
    }
}
