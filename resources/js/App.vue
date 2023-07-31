<template>
    <router-view />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/auth';


const authStore = useAuthStore()

onBeforeMount(async() => {
    const user = await authStore.getCurrentUser()
    console.log("Current User", user)
})
</script>
