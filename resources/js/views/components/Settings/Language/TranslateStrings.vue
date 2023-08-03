<template>
    <div class="card">
        <div class="card-body">
            <h6 class="card-title">{{ $t('dashboard.settings.translations') }}</h6>

            <form @submit.prevent="handleUpdate">
                <div class="mb-5">
                    <label class="form-label">{{ $t('dashboard.settings.selected_locale') }}</label>
                    <div class="input-group">
                        <select class="form-select" v-model="selectedLocale" @change="changeLocale" required>
                            <option value="">{{ $t('dashboard.settings.select') }}</option>
                            <option v-for="lang in langStore.languages" :key="lang.code" :value="lang.code">{{lang.name}}</option>
                        </select>

                        <button class="btn btn-primary" type="button" @click="handleModal(true)">
                            {{ $t('dashboard.settings.new_localization') }}
                            <i class="bi bi-database-add"></i>
                        </button>
                    </div>
                    <small class="text-muted">{{ $t('dashboard.settings.locale_list_desc') }}</small>
                </div>

                <div class="table-container mb-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">{{ $t('dashboard.settings.source_text') }}</th>
                                <th scope="col">{{ $t('dashboard.settings.translation') }}</th>
                                <th class="text-end">
                                    <div class="input-group">
                                        <input type="text" class="form-control" :placeholder="$t('form.placeholder.search')" v-model="search">
                                        <button class="btn btn-outline-primary"><i class="m-0 bi bi-search"></i></button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="getStrings.length > 0">
                            <tr v-for="(message, key) in getStrings" :key="message[0]">
                                <td class="text-muted">{{ message[0] }}</td>
                                <td colspan="2"><input type="text" :value="message[1]" @change="onWrite($event, key)" class="form-control border-0 bg-light"></td>
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
import { onBeforeMount, ref, computed } from "vue";
import { useLangStore } from "@/stores/lang";
import ModalLanguage from "./ModalLanguage.vue";

const app = window.AppConfig
const langStore = useLangStore()
const strings = ref([])
const selectedLocale = ref(null)
const showModal = ref(false)
const search = ref('')

const getStrings = computed(() =>
    strings.value.filter( el => el[1]
        .toLowerCase()
        .indexOf(search.value.toLowerCase()) >= 0))

onBeforeMount( async() => {
    selectedLocale.value = app.app_locale
    strings.value = Object.entries(app.locales[app.app_locale])
})

function handleUpdate() {
    langStore.update({strings: strings.value, code: selectedLocale.value})
}

function handleModal(value) {
    showModal.value = value
}

function changeLocale() {
    strings.value = Object.entries(app.locales[selectedLocale.value])
}

function onWrite($event, key) {
    strings.value[key][1] = $event.target.value
}
</script>

<style scoped>
.table tr {
    vertical-align: baseline;
}
.table td {
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
    font-size: 14px;
}
table.table tbody tr {
    width: 100%;
}
table.table thead, table tbody tr {
    display: table;
    table-layout: fixed;
}
.table td, .table th {
    white-space: normal;
}
</style>
