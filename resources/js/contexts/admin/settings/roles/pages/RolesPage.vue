<template>
    <DashboardLayout>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">{{ $t('dashboard.settings.settings') }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.settings.roles') }}</li>
            </ol>
        </nav>

        <div class="row">
            <settings-nav-tabs />

            <transition name="fade" appear>
                <div class="col-7 col-md-9 ps-0" v-if="roleStore.roles && roleStore.permissions">
                    <form-component />
                </div>
            </transition>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { onBeforeMount } from "vue";
import useRoleStore from "@/js/contexts/admin/settings/roles/stores/useRoleStore";
import DashboardLayout from "@/js/contexts/admin/shared/layouts/DashboardLayout.vue";
import FormComponent from "@/js/contexts/admin/settings/roles/components/FormComponent.vue";
import SettingsNavTabs from "@/js/contexts/admin/settings/general/components/SettingsNavTabs.vue";

const roleStore = useRoleStore()

onBeforeMount(async() => {
    await roleStore.fetch()
})
</script>
