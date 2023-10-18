import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { swalToast } from '@/plugins/swal'
import useRoleService from '@/services/roleService'

export const useRoleStore = defineStore('roleStore', () => {
    const roles = ref(null)

    const fetch = async() => {
        const { get } = useRoleService()

        try {
            const { data } = await get()
            const { status, results, message } = data

            if(!status)
                return swalToast(message, 'error')

            languages.value = results.data
        } catch(err) {
            console.log("[ERR] role.js", err)
        }
    }

    const create = async(payload) => {
        const { create } = useRoleService()

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
            swalToast(err.response.data.message || err.message, 'error')
            return false
        }
    }

    const update = async(payload) => {
        const { update } = useRoleService()

        try {
            const { data } = await update(payload)
            const { status, message } = data

            swalToast(message, status
                ? 'success'
                : 'error'
            )
        } catch(err) {
            swalToast(err.response.data.message || err.message, 'error')
        }
    }


    return {
        roles: computed( () => roles.value ),
        create,
        update,
        fetch
    }
})
