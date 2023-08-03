<template>
    <Admin>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">{{ $t('dashboard.settings.settings') }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.settings.localization') }}</li>
            </ol>
        </nav>

        <div class="row">
            <settings-nav-tabs />

            <div class="col-7 col-md-10 col-lg-9 ps-0">
                <form-component v-if="settingStore.settings" class="mb-3" />
            </div>
        </div>
    </Admin>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useSettingsStore } from "@/stores/settings";
import Admin from "@/views/layouts/Admin";
import FormComponent from "@/views/components/Settings/Analytics/FormComponent.vue";
import SettingsNavTabs from "@/views/components/Dashboard/SettingsNavTabs.vue";

const settingStore = useSettingsStore()

onBeforeMount(async() => {
    await settingStore.fetch()
})
</script>
