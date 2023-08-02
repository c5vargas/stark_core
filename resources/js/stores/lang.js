import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useLanguagesService from '@/services/languagesService'

export const useLangStore = defineStore('langStore', () => {
    const languages = ref(null)

    const fetch = async() => {
        const { get } = useLanguagesService()

        try {
            const { data } = await get()
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            languages.value = results.data
        } catch(err) {
            console.log("[ERR] lang.js", err)
        }
    }

    const create = async(payload) => {
        const { create } = useLanguagesService()

        try {
            const { data } = await create(payload)
            const { status, results, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            languages.value.push(results.data)
            swalToast(message)
            return true
        } catch(err) {
            swalToast(err.response.data.message, 'error')
            return false
        }
    }

    const update = async(payload) => {
        const { update } = useLanguagesService()

        try {
            const { data } = await update(payload)
            const { status, message } = data

            if(!status)
                return swalToast(message, 'error')

            swalToast(message)
        } catch(err) {
            swalToast(err.response.data.message, 'error')
        }
    }


    return {
        languages: computed( () => languages.value ),
        create,
        update,
        fetch
    }
})
