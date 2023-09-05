<template>
    <div v-if="!authStore.isLoading">
        <router-view  />
    </div>
    <div v-else>
        TODO Cargando
    </div>

</template>

<script setup>
import { useAuthStore } from './stores/auth';
const authStore = useAuthStore()
</script>
