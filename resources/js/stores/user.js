import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useUserService from '@/services/userService'

export const useUserStore = defineStore('userStore', () => {
    const users = ref(null)
    const isLoading = ref(false)
    const page = ref(1)
    const itemsPerPage = ref(15)
    const search = ref('')

    const usersPaginated = computed( () => {
        if(search.value.length > 2)
            return users.value.filter( el =>
                el.name.toLowerCase().indexOf(search.value.toLowerCase()) >= 0 ||
                el.email.toLowerCase().indexOf(search.value.toLowerCase()) >= 0)

        return users.value.slice(itemsPerPage.value * (page.value - 1), itemsPerPage.value * page.value)
    })

    const fetch = async() => {
        const { get } = useUserService()

        try {
            const { data } = await get()
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            users.value = results.data
        } catch(err) {
            console.log("[ERR] user.js", err)
        }
    }

    const find = async(id) => {
        const { find } = useUserService()

        try {
            const { data } = await find(id)
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            return results.data
        } catch(err) {
            console.log("[ERR] user.js", err)
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
            return true
        } catch(err) {
            swalToast(err.response.data.message, 'error')
            return true
        }
    }

    const destroy = async(id) => {
        const { destroy } = useUserService()

        try {
            const { data } = await destroy(id)
            const { status, message } = data

            if(!status)
                return swalToast(message, 'error')

            const index = users.value.findIndex(el => el.id === id)
            users.value.splice(index, 1)
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
        isLoading: computed( () => isLoading.value),
        itemsPerPage: computed( () => itemsPerPage.value),
        page: computed( () => page.value ),
        users: computed( () => users.value ),
        usersPaginated,
        search,
        create,
        fetch,
        setLoading,
        setPage,
        update,
        destroy,
        find
    }
})
