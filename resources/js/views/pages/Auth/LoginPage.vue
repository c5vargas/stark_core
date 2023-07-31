<template>
    <div class="main-wrapper">
        <div class="page-wrapper full-page">
            <div class="page-content d-flex align-items-center justify-content-center">

                <div class="row w-100 mx-0 auth-page">
                    <div class="col-md-8 col-xl-6 mx-auto">
                        <div class="card">
                            <div class="row">
                                <div class="col-md-4 pe-md-0">
                                    <div class="auth-side-wrapper"></div>
                                </div>
                                <div class="col-md-8 ps-md-0">
                                    <div class="auth-form-wrapper px-4 py-5">
                                        <a href="#" class="noble-ui-logo d-block mb-2">Noble<span>UI</span></a>
                                        <h5 class="text-muted fw-normal mb-4">Welcome back! Log in to your account.</h5>
                                        <form class="forms-sample" @submit.prevent="handleLogin">
                                            <div class="mb-3">
                                                <label for="userEmail" class="form-label">Email address</label>
                                                <input type="email" class="form-control" id="userEmail" placeholder="Email" v-model="credentials.email">
                                            </div>
                                            <div class="mb-3">
                                                <label for="userPassword" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="userPassword"
                                                    autocomplete="current-password" placeholder="Password" v-model="credentials.password">
                                            </div>
                                            <div>
                                                <button type="submit" class="btn btn-primary me-2 mb-2 mb-md-0 text-white">{{ $t('auth.Login') }}</button>
                                            </div>
                                            <a href="register.html" class="d-block mt-3 text-muted">Not a user? Sign up</a>
                                        </form>
                                    </div>
                                </div>
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
import {useAuthStore} from '@/stores/auth'

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
    // Move to dashboard
    router.push({name: 'dashboard'})
  }
}
</script>
