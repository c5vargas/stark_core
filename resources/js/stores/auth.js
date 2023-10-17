import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { swalToast } from '@/plugins/swal'
import { useLocalStorage } from "@vueuse/core"
import useAuthService from '@/services/authService'

export const useAuthStore = defineStore('authStore', () => {
    const router = useRouter()
    const auth = ref(null)
    const status = ref('unauthorised')
    const bearerToken = useLocalStorage('token', '')

    const { login, logout, getUser, isLoading } = useAuthService()

    const submitLogin = async({email, password}) => {
        try {
            const { data } = await login({email, password})
            const { status, results, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            setAuth(results.user, 'authorised')
            bearerToken.value = results.token
            return true
        } catch(err) {
            swalToast(err.response.data.message, 'error')
            return false
        }
    }

    const getCurrentUser = async() => {
        if(auth.value)
            return auth.value

        if(!bearerToken.value)
            return null

        try {
            const { data } = await getUser()

            if(!data.status) {
                setAuth(null, 'unauthorised')
                bearerToken.value = null
                return null
            }

            setAuth(data.user, 'authorised')

            isLoading.value = false
            return data.user
        } catch(err) {
            console.log("[ERR] auth.js", err)
            setAuth(null, 'unauthorised')
            bearerToken.value = null
            return null
        }

    }

    const logOut = async() => {
        setAuth(null, 'unauthorised')
        bearerToken.value = null
        localStorage.removeItem('token')
        await logout()

        router.push({ name: 'auth.login'} )
    }

    const can = (permissionName) => {
        return auth.value.roles[0].permissions.findIndex( (el) => el.name === permissionName) != -1
    }

    const setAuth = async(authArg, statusArg) => {
		auth.value      = authArg
		status.value    = statusArg
	}

    return {
        auth: computed( () => auth.value ),
        status: computed( () => status.value ),
        isLoading: computed( () => isLoading.value ),
        getToken: computed( () => bearerToken.value ),
        can,
        getCurrentUser,
        logOut,
        submitLogin,
    }
})
