import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
// import { swalToast } from '@/helpers/swal'
import { useLocalStorage } from "@vueuse/core"
import server from '../api/server'

export const useAuthStore = defineStore('authStore', () => {
    const router = useRouter()
    const auth = ref(null)
    const status = ref('unauthorised')
    const isLoading = ref(true)
    const bearerToken = useLocalStorage('token', '')

    const submitLogin = async({email, password}) => {
        try {
            await server.get("/sanctum/csrf-cookie");
            const { data } = await server.post('/api/auth/login', {email, password})
            const { status, results, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            setAuth(results.user, 'authorised')
            bearerToken.value = results.token
        } catch(err) {
            swalToast(err.response.data.data.message, 'error')
            return false
        }

        return true
    }

    const getCurrentUser = async() => {
        if(auth.value)
            return auth.value

        try {
            await server.get("/sanctum/csrf-cookie");
            const { data } = await server.get('/api/auth')
            const { status, user, message } = data

            if(!status) {
                swalToast(message, 'error')
                return null
            }
            setAuth(user, 'authorised')

            return user
        } catch(err) {
            swalToast(err.response.data.data.message, 'error')
            auth.value = null
            return null
        }
    }

    const submitLostPassword = async(email) => {
        try {
            const { data } = await server.post('/auth/password/forget', { email })
            const { status, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            swalToast(message, 'success')
            return true
        } catch(err) {
            swalToast(err, 'error')
            return false
        }
    }

    const submitResetPassword = async(formData) => {
        try {
            const { data } = await server.post('/auth/password/reset', formData)
            const { status, message } = data

            if(!status) {
                swalToast(message, 'error')
                return false
            }

            swalToast(message, 'success')

            return true
        } catch(err) {
            let errors = err.response.data.errors
            Object.keys(errors).forEach(key => {
                swalToast(errors[key][0], 'error')
            });
            return false
        }
    }

    const logOut = async() => {
        setAuth(null, 'unauthorised')
        bearerToken.value = null
        localStorage.removeItem('token')
        await server.post('/api/auth/logout')

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
        submitResetPassword,
        submitLostPassword,
    }
})
