<template>
    <div class="card">
        <div class="card-body">

            <h6 class="card-title">{{ $t('dashboard.settings.translations') }}</h6>

            <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.selected_locale') }}</label>
                    <select class="form-select" v-model="selectedLocale" @change="changeLocale" required>
                        <option value="">{{ $t('dashboard.settings.select') }}</option>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                    </select>
                    <small class="text-muted">{{ $t('dashboard.settings.locale_desc') }}</small>
                </div>

                <table class="table mb-3">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('dashboard.settings.source_text') }}</th>
                            <th scope="col">{{ $t('dashboard.settings.translation') }}</th>
                        </tr>
                    </thead>
                    <tbody v-if="strings.length > 0">
                        <tr v-for="message in strings" :key="message[0]">
                            <td scope="row">{{message[0]}}</td>
                            <td><input type="text" :value="message[1]" class="form-control"></td>
                        </tr>
                    </tbody>
                </table>

                <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
            </form>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useSettingsStore } from "@/stores/settings";

// import langJson from '@/../lang/en.json'

const settingStore = useSettingsStore()
const strings = ref([])
const selectedLocale = ref()

onBeforeMount( async() => {
    const app = window.AppConfig
    selectedLocale.value = app.app_locale

    const data = await import(`../../../../lang/${selectedLocale.value}.json`)
    strings.value = Object.entries(data.default)
})

function handleUpdate() {
    settingStore.update(form.value)
}
</script>

<style scoped>
.table tr {
    vertical-align: baseline;
}
.table td, .table th {
    white-space: nowrap;
    padding: 5px;
}
</style>
