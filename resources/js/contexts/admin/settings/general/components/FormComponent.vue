<template>
    <div class="card mb-3">
        <div class="card-body">
            <h6 class="card-title mb-0">{{ $t('dashboard.settings.general') }}</h6>
            <p class="fw-light mb-3">{{ $t('dashboard.settings.general_desc') }}</p>

            <p class="mb-0">{{ $t('dashboard.settings.general_long_desc') }}</p>
        </div>
    </div>

    <div class="card mb-3">
        <div class="card-body">
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

                    <div class="clr-field w-100" :style="`color: ${form.app_color}`">
                        <button type="button" aria-labelledby="clr-open-label"></button>
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
import { coloris, init } from "@melloware/coloris";
import useSettingsStore from "@/js/contexts/admin/settings/general/stores/useSettingsStore";

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

    coloris({
        el: "#coloris",
        defaultColor: form.value.app_color,
        theme: 'polaroid',
    });

})

const colorSelected = () => {
    backgroundColor: form.value.app_color;
}

function handleSubmit() {
    settingStore.update(form.value)
}
</script>

<style scoped>
.clr-field {
    display: inline-block;
    position: relative;
    color: transparent;
}
.clr-field button {
    border-radius: 50%;
    width: 22px;
    height: 22px;
    left: 5px;
    right: auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    padding: 0;
    border: 0;
    color: inherit;
    text-indent: -1000px;
    white-space: nowrap;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
}
.clr-field input {
    padding-left: 36px
}
</style>
