<template>
    <modal @on-submit="handleNew" @on-cancel="closeModal">
        <div class="mb-3">
            <label class="form-label">{{ $t('dashboard.settings.name_new_locale') }}</label>
            <input v-model="form.name" type="text" class="form-control" autocomplete="off" placeholder="English, Spanish...">
        </div>

        <div class="mb-3">
            <label class="form-label">{{ $t('dashboard.settings.select_new_locale') }}</label>
            <select class="form-select" v-model="form.code" required>
                <option value="">{{ $t('dashboard.settings.select') }}</option>
                <option v-for="lang in isoLangs" :value="lang.code">{{ lang.name }}</option>
            </select>
            <small class="text-muted">{{ $t('dashboard.settings.select_new_locale_desc') }}</small>
        </div>
    </modal>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/stores/settings";
import isoLangs from "@/plugins/isoLangs.js"
import Modal from "../Shared/Modal.vue";

const emits = defineEmits(['on-close'])
const settingsStore = useSettingsStore()
const form = ref({code: '', name: ''})

async function handleNew() {
    const resp = await settingsStore.addLocale(form.value)

    if(resp)
        emits('on-close')
}

function closeModal() {
    emits('on-close')
}

</script>
