import server from '@/api/server'
import { useSettingsStore } from '@/stores/settings'

export default function mailService() {
    const settingsStore = useSettingsStore()

    async function sendTest(email) {
        settingsStore.setLoading(true)

        await server.get("/sanctum/csrf-cookie");
        return server.post('/api/settings/mail', { email }).finally(() => {
            settingsStore.setLoading(false)
        })
    }

    return {
        sendTest,
    }
}
