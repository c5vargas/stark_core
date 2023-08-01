<template>
    <div class="card">
        <div class="card-body">

            <h6 class="card-title">{{ $t('dashboard.settings.translations') }}</h6>

            <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                    <label class="form-label">{{ $t('dashboard.settings.selected_locale') }}</label>
                    <div class="input-group">
                        <select class="form-select" v-model="selectedLocale" @change="changeLocale" required>
                            <option value="">{{ $t('dashboard.settings.select') }}</option>
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                        </select>

                        <button class="btn btn-outline-primary" type="button" @click="handleModal(true)">
                            {{ $t('dashboard.settings.new_localization') }}
                            <i class="bi bi-database-add"></i>
                        </button>
                    </div>
                    <small class="text-muted">{{ $t('dashboard.settings.locale_desc') }}</small>
                </div>

                <div class="table-container mb-3">
                    <table class="table border">
                        <thead>
                            <tr>
                                <th scope="col">{{ $t('dashboard.settings.source_text') }}</th>
                                <th scope="col">{{ $t('dashboard.settings.translation') }}</th>
                            </tr>
                        </thead>
                        <tbody v-if="strings.length > 0">
                            <tr v-for="message in strings" :key="message[0]">
                                <td scope="row">{{message[0]}}</td>
                                <td><input type="text" :value="message[1]" class="form-control border-0 bg-light"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update_translations') }}</button>
            </form>

            <modal-language v-if="showModal" @on-close="handleModal(false)" />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useSettingsStore } from "@/stores/settings";
import ModalLanguage from "./ModalLanguage.vue";

const app = window.AppConfig
const settingStore = useSettingsStore()
const strings = ref([])
const selectedLocale = ref(null)
const showModal = ref(false)

onBeforeMount( async() => {
    selectedLocale.value = app.app_locale
    strings.value = Object.entries(app.locales[app.app_locale])
})

function handleUpdate() {
    settingStore.update(form.value)
}

function handleModal(value) {
    showModal.value = value
}


</script>

<style scoped>
.table tr {
    vertical-align: baseline;
}
.table td {
    white-space: nowrap;
    padding: 5px;
}

.table th {
    padding: 15px 5px;
    font-weight: bold;
}

.table-container {
    height: 30rem;
}
table.table {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
}
table.table thead {
    flex: 0 0 auto;
    width: calc(100% - 0.9em);
}
table.table tbody {
    flex: 1 1 auto;
    display: block;
    overflow-y: scroll;
}
table.table tbody tr {
    width: 100%;
}
table.table thead, table tbody tr {
    display: table;
    table-layout: fixed;
}
</style>
