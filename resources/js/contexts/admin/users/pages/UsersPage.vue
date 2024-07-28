<template>
    <DashboardLayout>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">{{ $t('dashboard.users') }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.users.list') }}</li>
            </ol>
        </nav>

        <div class="row">
            <transition name="fade" appear>
                <div class="col-12" v-if="usrStore.users">
                    <list-component />
                </div>
            </transition>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { onBeforeMount } from "vue";
import useUserStore from "@/js/contexts/admin/users/stores/useUserStore.js";
import DashboardLayout from "@/js/contexts/admin/shared/layouts/DashboardLayout.vue";
import ListComponent from "@/js/contexts/admin/users/components/ListComponent.vue";

const usrStore = useUserStore()

onBeforeMount(async() => {
    await usrStore.fetch()
})
</script>
