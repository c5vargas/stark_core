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

            <transition name="fade" appear>
                <div class="col-7 col-md-10 col-lg-9 ps-0" v-if="settingStore.settings && langStore.languages">
                    <form-localization class="mb-3" />
                    <translate-strings class="mb-3" />
                </div>
            </transition>
        </div>
    </Admin>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useLangStore } from "@/stores/lang";
import { useSettingsStore } from "@/stores/settings";
import Admin from "@/views/layouts/Admin";
import FormLocalization from "@/views/components/Settings/Language/FormLocalization.vue";
import SettingsNavTabs from "@/views/components/Dashboard/SettingsNavTabs.vue";
import TranslateStrings from "@/views/components/Settings/Language/TranslateStrings.vue";

const langStore = useLangStore()
const settingStore = useSettingsStore()

onBeforeMount(async() => {
    await settingStore.fetch()
    await langStore.fetch()
})
</script>
