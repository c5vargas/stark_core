<template>
    <div class="card mb-3">
        <div class="card-body">
            <h6 class="card-title mb-0">{{ $t('dashboard.settings.one_signal') }}</h6>
            <p class="fw-light mb-3">{{ $t('dashboard.settings.one_signal_desc') }}</p>

            <p class="mb-4">{{ $t('dashboard.settings.one_signal_long_desc') }}</p>

            <div class="border shadow-sm bg-light">
                <a class="gap-2 align-items-center p-2 d-flex" href="https://documentation.onesignal.com/docs/web-push-custom-code-setup" target="_blank">
                    <i class="bi bi-question-square h2 text-muted"></i>
                    <div>
                        <p class="mb-0 h5 fw-bold">{{ $t('dashboard.settings.one_signal.read_documentation') }}</p>
                        <p class="mb-0 text-muted">{{ $t('dashboard.settings.one_signal.read_documentation_desc') }}</p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.one_signal.app_id') }}</label>
                    <input v-model="form.onesignal_app_id" type="text" class="form-control" autocomplete="off" placeholder="xs102855-d111-4b50-24e3-2f9bb78ddc70">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.one_signal.api_key') }}</label>
                    <input v-model="form.onesignal_api_key" type="text" class="form-control" autocomplete="off" placeholder="OGNiMjlkYTStODM5MF4Hu7aLWE5OWMtMmU5ZDQwOTliM2Rm">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.one_signal.safari_web_id') }}</label>
                    <input v-model="form.onesignal_safari_web_id" type="text" class="form-control" autocomplete="off" placeholder="web.onesignal.auto.xs102855-d111-4b50-24e3-2f9bb78ddc70">
                </div>

                <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSettingsStore } from "@/stores/settings";

const settingStore = useSettingsStore()
const form = ref({})

onMounted( async() => {
    form.value = {
        onesignal_app_id: settingStore.settings.onesignal_app_id,
        onesignal_api_key: settingStore.settings.onesignal_api_key,
        onesignal_safari_web_id: settingStore.settings.onesignal_safari_web_id,
    }
})

function handleSubmit() {
    settingStore.update(form.value)
}
</script>
