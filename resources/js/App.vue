<template>
    <div v-if="!authStore.isLoading">
        <router-view  />
    </div>
    <div v-else>
        TODO Cargando
    </div>

</template>

<script setup>
import useAuthStore from '@/js/contexts/auth/stores/useAuthStore';
const authStore = useAuthStore()
</script>
