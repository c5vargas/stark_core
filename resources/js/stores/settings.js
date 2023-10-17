import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useSettingsService from '@/services/settingsService'
import useLanguagesService from '@/services/languagesService'
import {useI18n} from 'vue-i18n';

export const useSettingsStore = defineStore('settingsStore', () => {
    const settings = ref(null)
    const isLoading = ref(false)
    const {t} = useI18n()

    const fetch = async() => {
        const { get } = useSettingsService()

        try {
            const { data } = await get()
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            let aux = {}
            results.data.forEach(element => {
                aux[element.key] = element.value
            })

            settings.value = aux
        } catch(err) {
            console.log("[ERR] settings.js", err)
        }
    }

    const update = async(payload) => {
        const { update } = useSettingsService()

        try {
            const { data } = await update(payload)
            const { status, message } = data

            if(!status)
                swalToast(message, 'error')

            swalToast(message)
        } catch(err) {
            console.log("[ERR] settings.js", err)
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
            console.log("[ERR] settings.js", err)
            return false
        }
    }

    function getNotices() {
        const {app_name, mail_password, mail_username} = {...settings.value}
        let notices = []

        if(app_name == 'Laravel' || !app_name) {
            notices.push({
                title: t('notice.title.app_name'),
                message: t('notice.message.app_name'),
                optional: t('notice.optional.app_name'),
                type: 'primary'
            })
        }

        if(!mail_username || !mail_password) {
            notices.push({
                title: t('notice.title.app_mailer'),
                message: t('notice.message.app_mailer'),
                optional: t('notice.optional.app_mailer'),
                type: 'primary'
            })
        }

        return notices
    }

    function setLoading(status) {
        isLoading.value = status
    }

    return {
        settings: computed( () => settings.value),
        isLoading: computed( () => isLoading.value),
        addLocale,
        fetch,
        getNotices,
        setLoading,
        update,
    }
})
