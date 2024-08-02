<template>
    <div class="col-5 col-md-2 col-lg-3">
        <div class="card">
            <div class="nav nav-tabs nav-tabs-vertical border-0 rounded-0">
                <router-link v-for="item in navigator" :key="item.route" :to="{name: item.route}" class="nav-link border-0 py-3">
                    <i class="bi pe-2" :class="item.icon"></i>
                    {{ $t(item.name) }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
const navigator = [
    {
        name: 'dashboard.settings.general',
        route: 'dashboard.settings.general',
        icon: 'bi-gear'
    },
    {
        name: 'dashboard.settings.localization',
        route: 'dashboard.settings.localization',
        icon: 'bi-translate'
    },
    {
        name: 'dashboard.settings.analytics',
        route: 'dashboard.settings.analytics',
        icon: 'bi-graph-up'
    },
    {
        name: 'dashboard.settings.mail',
        route: 'dashboard.settings.mail',
        icon: 'bi-envelope'
    },
    {
        name: 'dashboard.settings.roles',
        route: 'dashboard.settings.roles',
        icon: 'bi-person-lock'
    },
    {
        name: 'dashboard.settings.one_signal',
        route: 'dashboard.settings.onesignal',
        icon: 'bi-app-indicator'
    },
    {
        name: 'dashboard.settings.gdpr',
        route: 'dashboard.settings.gdpr',
        icon: 'bi-shield-check'
    }
]
</script>

<style scoped>
    .nav.nav-tabs .nav-link.active {
        border-radius: 5px!important;
        border-left: 4px solid #6571ff!important;
    }

    .nav.nav-tabs.nav-tabs-vertical .nav-link:first-child {
        border-radius: 0;
    }
</style>
