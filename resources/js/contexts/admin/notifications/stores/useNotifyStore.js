import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/js/plugins/swal'
import useNotifyService from '@/js/contexts/admin/notifications/services/notifyService'

const useNotifyStore = defineStore('notifyStore', () => {
    const notifications = ref(null)
    const isLoading = ref(false)
    const page = ref(1)
    const itemsPerPage = ref(15)
    const search = ref('')

    const notificationsPaginated = computed( () => {
        if(search.value.length > 2)
            return notifications.value.filter( el =>
                el.name.toLowerCase().indexOf(search.value.toLowerCase()) >= 0 ||
                el.email.toLowerCase().indexOf(search.value.toLowerCase()) >= 0)

        return notifications.value.slice(itemsPerPage.value * (page.value - 1), itemsPerPage.value * page.value)
    })

    const fetch = async() => {
        const { get } = useNotifyService()

        try {
            const { data } = await get()
            const { status, results } = data

            if(!status)
                return swalToast(message, 'error')

            notifications.value = results.notifications
        } catch(err) {
            console.log("[ERR] notify.js", err)
        }
    }

    const find = async(id) => {
        const { find } = useNotifyService()

        try {
            const { data } = await find(id)
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            return results
        } catch(err) {
            console.log("[ERR] notify.js", err)
        }
    }

    const create = async(payload) => {
        const { create } = useNotifyService()

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
            swalToast(err.response.data.message, 'error')
            return false
        }
    }

    const destroy = async(id) => {
        const { destroy } = useNotifyService()

        try {
            const { data } = await destroy(id)
            const { status, message } = data

            if(!status)
                return swalToast(message, 'error')

            const notification = notifications.value.find(el => el.id === id)
            notification.canceled = true
            swalToast(message)

            return true
        } catch(err) {
            swalToast(err.response.data.message, 'error')
            return false
        }
    }

    function setLoading(status) {
        isLoading.value = status
    }

    function setPage(value) {
        page.value = value
    }

    return {
        isLoading: computed( () => isLoading.value),
        itemsPerPage: computed( () => itemsPerPage.value),
        page: computed( () => page.value ),
        notifications: computed( () => notifications.value ),
        notificationsPaginated,
        search,
        create,
        fetch,
        setLoading,
        setPage,
        destroy,
        find
    }
})

export default useNotifyStore