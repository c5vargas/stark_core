<template>
    <div class="card">
        <div class="card-body">
            <h6 class="card-title mb-0">{{ $t('dashboard.settings.mail_test') }}</h6>
            <h6 class="text-muted mb-3">{{ $t('dashboard.settings.mail_test_desc') }}</h6>

            <form @submit.prevent="handleSubmit">
                <div class="d-block d-md-flex gap-3 align-items-end">
                    <div class="w-100 mb-3">
                        <label class="form-label">{{ $t('dashboard.settings.mail.test_address') }}</label>
                        <input v-model="email" type="email" placeholder="example@test.com" class="form-control">
                    </div>

                    <div class="d-grid mb-3">
                        <button type="submit" :disabled="loading" class="btn d-flex align-items-center btn-primary px-5">
                            <span v-if="!loading">{{ $t('dashboard.settings.send') }}</span>
                            <template v-else>
                                <span class="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Loading...</span>
                            </template>
                        </button>
                    </div>
                </div>


            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { swalToast } from "@/plugins/swal.js"
import useMailService from "@/services/mailService";

const email = ref('')
const loading = ref(false)

async function handleSubmit() {
    loading.value = true
    const { sendTest } = useMailService()

    try {
        const { data } = await sendTest(email.value)
        const { status, message } = data
        swalToast(message, status ? 'success' : 'error')
    } catch(err) {
        swalToast(err.response.data.message || err.message, 'error')
    } finally {
        loading.value = false
        email.value = ''
    }
}
</script>
