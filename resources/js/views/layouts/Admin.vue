<template>
    <div class="main-wrapper">
        <admin-sidebar />

        <div class="page-wrapper">
            <admin-navbar />

            <div class="page-content">
                <slot></slot>
            </div>

            <admin-footer />
        </div>

    </div>
</template>

<script setup>
import AdminSidebar from './parts/AdminSidebar.vue';
import AdminNavbar from './parts/AdminNavbar.vue';
import AdminFooter from './parts/AdminFooter.vue'
import { onBeforeMount } from 'vue';
</script>
