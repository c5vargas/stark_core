<template>
    <div class="card">
        <div class="card-body">

            <h6 class="card-title">{{ $t('dashboard.settings.localization') }}</h6>

            <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.default_locale') }}</label>
                    <select class="form-select" v-model="form.app_locale" required>
                        <option value="">{{ $t('dashboard.settings.select') }}</option>
                        <option v-for="lang in langStore.languages" :key="lang.code" :value="lang.code">{{lang.name}}</option>
                    </select>
                    <small class="text-muted">{{ $t('dashboard.settings.locale_desc') }}</small>
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.default_timezone') }}</label>
                    <select class="form-select" v-model="form.app_timezone" required>
                        <option value="">{{ $t('dashboard.settings.select') }}</option>
                        <option v-for="item in phpTimezone" :key="item" :value="item">{{ item }}</option>
                    </select>
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
import useSettingsStore from "@/js/contexts/admin/settings/general/stores/useSettingsStore";
import phpTimezone from "@/js/plugins/phpTimezone.js"
import useLangStore from "@/js/contexts/admin/settings/localization/stores/useLangStore";

const app = window.AppConfig
const settingStore = useSettingsStore()
const langStore = useLangStore()
const form = ref({})

onBeforeMount(() => {
    form.value = {...app}
    form.value.app_translations
        = app.app_translations === "1"
        ? true : false
})

function handleUpdate() {
    settingStore.update(form.value)
}
</script>
