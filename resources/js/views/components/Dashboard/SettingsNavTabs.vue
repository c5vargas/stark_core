<template>
    <div class="col-5 col-md-3">
        <div class="card">
            <div class="nav nav-tabs nav-tabs-vertical border-0 rounded-0">
                <router-link :to="{name:'dashboard.settings.general'}" class="nav-link border-0 py-3">{{ $t('dashboard.settings.general') }}</router-link>
                <router-link :to="{name:'dashboard.settings.localization'}" class="nav-link border-0 py-3">{{ $t('dashboard.settings.localization') }}</router-link>
                <router-link :to="{name:'dashboard.settings.analytics'}" class="nav-link border-0 py-3">{{ $t('dashboard.settings.analytics') }}</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .nav.nav-tabs .nav-link.active {
        border-radius: 5px!important;
        border-left: 4px solid #6571ff!important;
    }

    .nav.nav-tabs.nav-tabs-vertical .nav-link:first-child {
        border-radius: 0;
    }
</style>
