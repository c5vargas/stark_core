<template>
    <DashboardLayout>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">{{ $t('dashboard.settings.settings') }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.settings.localization') }}</li>
            </ol>
        </nav>

        <div class="row">
            <settings-nav-tabs />

            <transition name="fade" appear>
                <div class="col-7 col-md-10 col-lg-9 ps-0" v-if="settingStore.settings">
                    <form-component />
                </div>
            </transition>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { onBeforeMount } from "vue";
import useSettingsStore from "@/js/contexts/admin/settings/general/stores/useSettingsStore";
import DashboardLayout from "@/js/contexts/admin/shared/layouts/DashboardLayout.vue";
import FormComponent from "@/js/contexts/admin/settings/analytics/components/FormComponent.vue";
import SettingsNavTabs from "@/js/contexts/admin/settings/general/components/SettingsNavTabs.vue";

const settingStore = useSettingsStore()

onBeforeMount(async() => {
    await settingStore.fetch()
})
</script>
