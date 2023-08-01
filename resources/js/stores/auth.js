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
    const isLoading = ref(true)
    const bearerToken = useLocalStorage('token', '')

    const { login, logout, getUser } = useAuthService()

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

        try {
            const { data } = await getUser()

            if(!data.status)
                return null

            setAuth(data.user, 'authorised')
            return data.user
        } catch(err) {
            console.log("[ERR] auth.js", err)

            setAuth(null, 'unauthorised')
            bearerToken.value = null
            return null
        }
    }

    // const submitLostPassword = async(email) => {
    //     try {
    //         const { data } = await server.post('/auth/password/forget', { email })
    //         const { status, message } = data

    //         if(!status) {
    //             swalToast(message, 'error')
    //             return false
    //         }

    //         swalToast(message, 'success')
    //         return true
    //     } catch(err) {
    //         swalToast(err, 'error')
    //         return false
    //     }
    // }

    // const submitResetPassword = async(formData) => {
    //     try {
    //         const { data } = await server.post('/auth/password/reset', formData)
    //         const { status, message } = data

    //         if(!status) {
    //             swalToast(message, 'error')
    //             return false
    //         }

    //         swalToast(message, 'success')

    //         return true
    //     } catch(err) {
    //         let errors = err.response.data.errors
    //         Object.keys(errors).forEach(key => {
    //             swalToast(errors[key][0], 'error')
    //         });
    //         return false
    //     }
    // }

    const logOut = async() => {
        setAuth(null, 'unauthorised')
        bearerToken.value = null
        localStorage.removeItem('token')
        await logout()

        router.push({ name: 'auth.login'} )
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
        logOut,
        submitLogin,
        getCurrentUser,
        // submitResetPassword,
        // submitLostPassword,
    }
})
