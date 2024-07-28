<template>
    <DashboardLayout>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">{{ $t('dashboard.notifications') }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.notifications.list') }}</li>
            </ol>
        </nav>

        <div class="row">
            <transition name="fade" appear>
                <div class="col-12" v-if="notifyStore.notifications">
                    <list-component />
                </div>
            </transition>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { onBeforeMount } from "vue";
import useNotifyStore from "@/js/contexts/admin/notifications/stores/useNotifyStore";
import DashboardLayout from "@/js/contexts/admin/shared/layouts/DashboardLayout.vue";
import ListComponent from "@/js/contexts/admin/notifications/components/ListComponent.vue";

const notifyStore = useNotifyStore()

onBeforeMount(async() => {
    await notifyStore.fetch()
})
</script>
