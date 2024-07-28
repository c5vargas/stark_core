<template>
    <div class="main-wrapper">
        <div class="page-wrapper full-page">
            <div class="page-content d-flex align-items-center justify-content-center">

                <div class="row w-100 mx-0 auth-page">
                    <div class="col-md-6 col-xl-4 mx-auto">
                        <div class="card">
                            <div class="auth-form-wrapper px-4 py-5">
                                <a href="#" class="noble-ui-logo d-block mb-2">Noble<span>UI</span></a>
                                <h5 class="text-muted fw-normal mb-4">{{ $t('auth.welcome') }}</h5>
                                <form class="forms-sample" @submit.prevent="handleLogin">
                                    <div class="mb-3">
                                        <label for="userEmail" class="form-label">{{ $t('auth.email') }}</label>
                                        <input type="email" class="form-control" id="userEmail" placeholder="Email" v-model="credentials.email" required="">
                                    </div>
                                    <div class="mb-3">
                                        <label for="userPassword" class="form-label">{{ $t('auth.password') }}</label>
                                        <input type="password" class="form-control" id="userPassword"
                                            autocomplete="current-password" placeholder="Password" v-model="credentials.password" required="">
                                    </div>
                                    <div class="d-flex gap-3 text-align-center">
                                        <button type="submit" class="btn btn-primary text-white">{{ $t('auth.login') }}</button>
                                        <a href="register.html" class="text-muted my-auto">{{ $t('auth.signup') }}</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router'
import useAuthStore from '@/js/contexts/auth/stores/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()
const credentials = ref({ email: '', password: '' })

onBeforeMount(async() => {
    if (await authStore.getCurrentUser()) {
        router.push({name: 'dashboard'})
    }
})

async function handleLogin() {
    const status = await authStore.submitLogin(credentials.value)

    if(status) {
        router.push({name: 'dashboard'})
    }
}
</script>
