<template>
    <Admin>
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
    </Admin>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useNotifyStore } from "@/stores/notify";
import Admin from "@/views/layouts/Admin";
import ListComponent from "@/views/components/Notifications/ListComponent.vue";

const notifyStore = useNotifyStore()

onBeforeMount(async() => {
    await notifyStore.fetch()
})
</script>
