<template>
    <Admin>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Settings</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.settings.localization') }}</li>
            </ol>
        </nav>

        <div class="row">
            <settings-nav-tabs />

            <div class="col-7 col-md-10 col-lg-9 ps-0">
                <form-localization class="mb-3" />
                <translate-strings />
            </div>
        </div>
    </Admin>
</template>

<script setup>
import Admin from "@/views/layouts/Admin";
import SettingsNavTabs from "@/views/components/Dashboard/SettingsNavTabs.vue";
import FormLocalization from "@/views/components/Settings/FormLocalization.vue";
import TranslateStrings from "@/views/components/Settings/TranslateStrings.vue";
import { useLangStore } from "@/stores/lang";
import { onBeforeMount } from "vue";

const langStore = useLangStore()

onBeforeMount(async() => {
    await langStore.fetch()
})
</script>
