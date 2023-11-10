<template>
    <div class="card">
        <div class="card-body">
            <h6 class="card-title">{{ $t('dashboard.settings.general') }}</h6>

            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.site_url') }}</label>
                    <input :value="appUrl" type="text" readonly disabled class="form-control" autocomplete="off" placeholder="https://site.url">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.site_name') }}</label>
                    <input v-model="form.app_name" type="text" class="form-control" autocomplete="off" :placeholder="$t('dashboard.settings.site_name')">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.site_descr') }}</label>
                    <textarea v-model="form.app_descr" class="form-control"></textarea>
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
const appUrl = import.meta.env.VITE_APP_URL
const form = ref({})

onMounted( async() => {
    form.value = {
        app_name: settingStore.settings.app_name,
        app_descr: settingStore.settings.app_descr,
    }
})

function handleSubmit() {
    settingStore.update(form.value)
}
</script>
