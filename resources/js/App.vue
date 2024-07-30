<template>
    <div v-if="!authStore.isLoading">
        <router-view  />
    </div>
    <div v-else>
        <LoadingDots />
    </div>

</template>

<script setup>
import useAuthStore from '@/js/contexts/auth/stores/useAuthStore';
import LoadingDots from '@/js/contexts/admin/shared/components/LoadingDots.vue';
const authStore = useAuthStore()
</script>
