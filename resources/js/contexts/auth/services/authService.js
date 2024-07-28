import server from '@/js/api/server'
import { ref } from 'vue'

export default function authService() {
    const isLoading = ref(false)

    async function login(payload) {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/auth/login', payload).finally(() => {
            isLoading.value = false
        })
    }

    async function getUser() {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.get('/api/auth').finally(() => {
            isLoading.value = false
        })
    }

    async function logout() {
        isLoading.value = true

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/auth/logout').finally(() => {
            isLoading.value = false
        })
    }

    return {
        login,
        getUser,
        logout,
        isLoading,
    }
}
