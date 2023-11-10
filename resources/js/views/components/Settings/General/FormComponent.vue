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

                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.site_color') }}</label>
                    <div class="d-flex align-items-center">
                        <input type="text" class="form-control" v-model="form.app_color" id="coloris">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import "@melloware/coloris/dist/coloris.css";
import { onMounted, ref } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { coloris, init } from "@melloware/coloris";

const settingStore = useSettingsStore()
const appUrl = import.meta.env.VITE_APP_URL
const form = ref({})

onMounted( async() => {
    form.value = {
        app_name: settingStore.settings.app_name,
        app_descr: settingStore.settings.app_descr,
        app_color: settingStore.settings.app_color,
    }

    init();
    coloris({el: "#coloris"});

})

const colorSelected = () => {
    backgroundColor: form.value.app_color;
}

function handleSubmit() {
    settingStore.update(form.value)
}
</script>

<style scoped>
.color-preview {
    border-radius: 50%;
    height: 20px;
    width: 20px;
}
</style>
