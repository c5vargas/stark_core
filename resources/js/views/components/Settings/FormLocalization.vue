<template>
    <div class="card">
        <div class="card-body">

            <h6 class="card-title">{{ $t('dashboard.settings.localization') }}</h6>

            <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.default_locale') }}</label>
                    <select class="form-select" v-model="form.app_locale" required>
                        <option value="">{{ $t('dashboard.settings.select') }}</option>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                    </select>
                    <small class="text-muted">{{ $t('dashboard.settings.locale_desc') }}</small>
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.default_timezone') }}</label>
                    <input v-model="form.app_timezone" type="text" class="form-control" autocomplete="off" placeholder="Europe/Madrid">
                    <small class="text-muted">{{ $t('dashboard.settings.timezone_desc') }}</small>
                </div>

                <div class="mb-3">
                    <div class="form-check form-switch mb-2">
                        <input type="checkbox" v-model="form.app_translations" class="form-check-input" id="translations-switch">
                        <label class="form-check-label" for="translations-switch">{{ $t('dashboard.settings.translations') }}</label>
                    </div>
                    <small class="text-muted">{{ $t('dashboard.settings.translations_desc') }}</small>
                </div>

                <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
            </form>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useSettingsStore } from "@/stores/settings";

const app = window.AppConfig
const form = ref({})
const settingStore = useSettingsStore()

onBeforeMount(() => {
    form.value = {...app}
})

function handleUpdate() {
    settingStore.update(form.value)
}
</script>
