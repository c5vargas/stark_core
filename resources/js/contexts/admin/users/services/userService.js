import server from '@/js/api/server'
import useUserStore from "@/js/contexts/admin/users/stores/useUserStore";

export default function userService() {
    const usrStore = useUserStore()

    async function get() {
        usrStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.get('/api/users').finally(() => {
            usrStore.setLoading(false)
        })
    }

    async function find(id) {
        usrStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.get(`/api/users/${id}`).finally(() => {
            usrStore.setLoading(false)
        })
    }

    async function update(payload) {
        usrStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/users/update', payload).finally(() => {
            usrStore.setLoading(false)
        })
    }

    async function create(payload) {
        usrStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/users', payload).finally(() => {
            usrStore.setLoading(false)
        })
    }

    async function destroy(id) {
        usrStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.delete(`/api/users/${id}`).finally(() => {
            usrStore.setLoading(false)
        })
    }

    return {
        get,
        update,
        create,
        destroy,
        find,
    }
}
