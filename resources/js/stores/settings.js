import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useSettingsService from '@/services/settingsService'

export const useSettingsStore = defineStore('settingsStore', () => {
    const settings = ref(null)

    const update = async(payload) => {
        const { update } = useSettingsService()

        try {
            const { data } = await update(payload)
            const { status, message } = data

            if(!status)
                swalToast(message, 'error')

            swalToast(message)
        } catch(err) {
            swalToast(err.response.data.data.message, 'error')
        }
    }


    return {
        settings: computed( () => settings.value ),
        update
    }
})
