<template>
    <Admin>
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
    </Admin>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRoleStore } from "@/stores/role";
import Admin from "@/views/layouts/Admin";
import FormComponent from "@/views/components/Settings/Roles/FormComponent.vue";
import SettingsNavTabs from "@/views/components/Settings/SettingsNavTabs.vue";

const roleStore = useRoleStore()

onBeforeMount(async() => {
    await roleStore.fetch()
})
</script>
