<template>
    <div class="main-wrapper">
        <admin-sidebar />

        <div class="page-wrapper">
            <admin-navbar />

            <div class="page-content">
                <admin-notices :notice="notices[0]" />
                <slot></slot>
            </div>

            <admin-footer />
        </div>

    </div>
</template>

<script setup>
import {ref,onBeforeMount} from 'vue'
import AdminSidebar from './parts/AdminSidebar.vue';
import AdminNavbar from './parts/AdminNavbar.vue';
import AdminFooter from './parts/AdminFooter.vue'
import AdminNotices from '@/views/components/Shared/AdminNotices.vue';
import {useSettingsStore} from '@/stores/settings'

const store = useSettingsStore()
const notices = ref([])

onBeforeMount( async() => {
    await store.fetch();
    notices.value = store.getNotices();
})
</script>
