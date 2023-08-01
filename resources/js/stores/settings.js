import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useSettingsService from '@/services/settingsService'
import useLanguagesService from '@/services/languagesService'

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

    const addLocale = async(payload) => {
        const { create } = useLanguagesService()

        try {
            const { data } = await create(payload)
            const { status, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            swalToast(message)
            return true
        } catch(err) {
            swalToast(err.response.data.data.message, 'error')
            return false
        }
    }


    return {
        settings: computed( () => settings.value ),
        update,
        addLocale,
    }
})
