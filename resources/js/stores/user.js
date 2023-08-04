import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useUserService from '@/services/userService'

export const useUserStore = defineStore('userStore', () => {
    const users = ref(null)
    const isLoading = ref(false)
    const page = ref(1)

    const fetch = async() => {
        const { get } = useUserService()

        try {
            const { data } = await get()
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            users.value = results.data
        } catch(err) {
            console.log("[ERR] lang.js", err)
        }
    }

    const create = async(payload) => {
        const { create } = useUserService()

        try {
            const { data } = await create(payload)
            const { status, results, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            users.value.push(results.data)
            swalToast(message)
            return true
        } catch(err) {
            swalToast(err.response.data.message, 'error')
            return false
        }
    }

    const update = async(payload) => {
        const { update } = useUserService()

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

    function setLoading(status) {
        isLoading.value = status
    }

    function setPage(value) {
        page.value = value
    }

    return {
        users: computed( () => users.value ),
        page: computed( () => page.value ),
        isLoading: computed( () => isLoading.value),
        create,
        update,
        fetch,
        setLoading,
        setPage
    }
})
