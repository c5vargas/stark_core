import server from '@/js/api/server'
import useNotifyStore from '@/js/contexts/admin/notifications/stores/useNotifyStore'

export default function notifyService() {
    const notifyStore = useNotifyStore()

    async function get() {
        notifyStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.get('/api/notifications').finally(() => {
            notifyStore.setLoading(false)
        })
    }

    async function find(id) {
        notifyStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.get(`/api/notifications/${id}`).finally(() => {
            notifyStore.setLoading(false)
        })
    }

    async function create(payload) {
        notifyStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/notifications', payload).finally(() => {
            notifyStore.setLoading(false)
        })
    }

    async function destroy(id) {
        notifyStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.delete(`/api/notifications/${id}`).finally(() => {
            notifyStore.setLoading(false)
        })
    }

    return {
        get,
        create,
        destroy,
        find,
    }
}
