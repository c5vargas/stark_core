<template>
    <div class="card">
        <div class="card-body">
            <h6 class="card-title mb-0">{{ $t('dashboard.settings.analytics') }}</h6>
            <h6 class="text-muted mb-3">{{ $t('dashboard.settings.google.analytics_desc') }}</h6>

            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.mail.from_address') }}</label>
                    <input v-model="form.mail_from_address" type="email" class="form-control">
                    <small class="text-muted">{{ $t('dashboard.settings.mail.from_address_desc') }}</small>
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.mail.contact_address') }}</label>
                    <input v-model="form.mail_contact_address" type="email" class="form-control">
                    <small class="text-muted">{{ $t('dashboard.settings.mail.contact_address_desc') }}</small>
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.google.mail.from_name') }}</label>
                    <input v-model="form.mail_from_name" type="text" class="form-control">
                    <small class="text-muted">{{ $t('dashboard.settings.mail.from_name_desc') }}</small>
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
