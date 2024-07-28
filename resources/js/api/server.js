import axios from 'axios'
import useAuthStore from '@/js/contexts/auth/stores/useAuthStore'

const server = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

server.interceptors.request.use( function(config) {
    const store = useAuthStore()
    config.headers.Accept = 'application/json'

    if(store.getToken) {
        config.headers.Authorization = `Bearer ${store.getToken}`
    }

    return config
})

server.interceptors.response.use(
    function(response) {
        return response;
    }), async function (error) {
        const store = useAuthStore()
        let data = await store.getCurrentUser()

        if(error.response && [401, 419].includes(error.response.status) && data) {
            let temp = axios.create({
                baseURL: import.meta.env.VITE_API_URL,
                withCredentials: true,
            })

            temp.post("/api/auth/logout").then((r) => {
                window.location.href = '/';
            })
        }
        return Promise.reject(error);
    }

export default server
