<template>
    <Admin>
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
    </Admin>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import Admin from "@/views/layouts/Admin";
import ListComponent from "@/views/components/Users/ListComponent.vue";

const usrStore = useUserStore()

onBeforeMount(async() => {
    await usrStore.fetch()
})
</script>
