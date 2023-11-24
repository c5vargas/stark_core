<template>
    <div class="card mb-3">
        <div class="card-body">
            <h6 class="card-title mb-0">{{ $t('dashboard.settings.google.analytics') }}</h6>
            <p class="fw-light mb-3">{{ $t('dashboard.settings.google.analytics_desc') }}</p>

            <p class="mb-4">{{ $t('dashboard.settings.google.analytics_long_desc') }}</p>

            <div class="border shadow-sm bg-light">
                <a class="gap-2 align-items-center p-2 d-flex" href="https://support.google.com/analytics/answer/9304153" target="_blank">
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
                    <label class="form-label">{{ $t('dashboard.settings.google.account_key') }}</label>
                    <input type="file" class="form-control">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.google.analytics_property') }}</label>
                    <input v-model="form.analytics_property_id" type="text" class="form-control">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.google.manager_measurement') }}</label>
                    <input v-model="form.manager_measurement_id" type="text" class="form-control" placeholder="G-******">
                    <small class="text-muted">{{ $t('dashboard.settings.google.manager_measurement_desc') }}</small>
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.google.maps_api_key') }}</label>
                    <input v-model="form.maps_api_key" type="text" class="form-control">
                    <small class="text-muted">{{ $t('dashboard.settings.google.maps_api_key_desc') }}</small>
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
        analytics_property_id: settingStore.settings.analytics_property_id,
        manager_measurement_id: settingStore.settings.manager_measurement_id,
        maps_api_key: settingStore.settings.maps_api_key
    }
})

function handleSubmit() {
    settingStore.update(form.value)
}
</script>
