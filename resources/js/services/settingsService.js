import server from '@/api/server'
import { useSettingsStore } from '@/stores/settings'

export default function settingsService() {
    const settingsStore = useSettingsStore()

    async function get() {
        settingsStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.get('/api/settings').finally(() => {
            settingsStore.setLoading(false)
        })
    }

    async function update(payload) {
        settingsStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/settings/update', payload).finally(() => {
            settingsStore.setLoading(false)
        })
    }

    async function create(payload) {
        settingsStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/settings/locale', payload).finally(() => {
            settingsStore.setLoading(false)
        })
    }

    return {
        get,
        update,
        create,
    }
}
