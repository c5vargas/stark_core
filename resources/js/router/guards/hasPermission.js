import { useAuthStore } from '../../stores/auth'

const hasPermission = async(to, from, next) => {
    const store = useAuthStore()
    await store.getCurrentUser()

    if (store.status !== 'authorised') {
        return next({ name: 'auth.login' })
    }

    if (!store.can(to.meta.permission)) {
        console.log("Can't access sorry :(")
        return next({ name: 'auth.login' })
    }

    next()
}

export default hasPermission
