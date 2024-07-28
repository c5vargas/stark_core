import useAuthStore from '@/js/contexts/auth/stores/useAuthStore'

const isAuth = async( to, from, next) => {
    const store = useAuthStore()
    await store.getCurrentUser()

    if (store.status !== 'authorised') {
        return next({ name: 'auth.login' })
    }

    next()
}

export default isAuth
