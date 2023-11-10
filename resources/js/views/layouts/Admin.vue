<template>
    <div class="main-wrapper">
        <admin-sidebar />

        <div class="page-wrapper">
            <admin-navbar />

            <div class="page-content">
                <transition name="list" appear>
                    <admin-notices :key="notices.length" v-if="notices.length > 0" :notice="notices[0]" @on-cancel="notices = []" />
                </transition>
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
    if(!store.settings) {
        await store.fetch()
        notices.value = store.getNotices()
    }
})
</script>
