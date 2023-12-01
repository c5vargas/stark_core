<template>
    <nav class="sidebar">
        <div class="sidebar-header">
            <a href="#" class="sidebar-brand">
                Noble<span>UI</span>
            </a>
            <div class="sidebar-toggler not-active">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="sidebar-body">
            <ul class="nav">
                <template v-for="cat in categories" :key="`cat-${cat}`">
                    <li class="nav-item nav-category text-uppercase">{{cat}}</li>
                    <li class="nav-item" v-for="item in sidebar.filter(el => el.category == cat)">

                        <router-link :to="{name: item.route}" class="nav-link" v-if="item.childRoutes.length === 0">
                            <i class="link-icon bi" :class="item.icon"></i>
                            <span class="link-title">{{item.name}}</span>
                        </router-link>

                        <template v-else>
                            <a class="nav-link" data-bs-toggle="collapse" :href="`#${item.route}`" role="button" aria-expanded="false"
                                :aria-controls="item.route">
                                <i class="link-icon bi" :class="item.icon"></i>
                                <span class="link-title">{{item.name}}</span>
                                <i class="link-arrow bi bi-chevron-down"></i>
                            </a>
                            <div class="collapse" :id="item.route">
                                <ul class="nav sub-menu">
                                    <li class="nav-item" v-for="child in item.childRoutes" :key="`child-${child.route}`">
                                        <router-link :to="{name: child.route, params: child.params }" class="nav-link">{{child.name}}</router-link>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const categories = ['main', 'web apps', 'configuration']
const sidebar = [
    {
        name: 'Dashboard',
        category: 'main',
        route: 'dashboard',
        icon: 'bi-grid',
        childRoutes: []
    },
    {
        name: t('dashboard.users'),
        category: 'web apps',
        route: 'users',
        icon: 'bi-people',
        childRoutes: [
            {
                name: t('dashboard.users.list'),
                route: 'dashboard.users',
                params: null
            },
            {
                name: t('dashboard.users.create'),
                route: 'dashboard.users.single',
                params: {id: 'new'}
            }
        ]
    },
    {
        name: t('dashboard.notifications'),
        category: 'web apps',
        route: 'notifications',
        icon: 'bi-bell',
        childRoutes: [
            {
                name: t('dashboard.notifications.list'),
                route: 'dashboard.notifications',
                params: null
            },
            {
                name: t('dashboard.notifications.create'),
                route: 'dashboard.notifications.single',
                params: {id: 'new'}
            }
        ]
    },
    {
        name: t('dashboard.settings.general'),
        category: 'configuration',
        route: 'settings',
        icon: 'bi-gear',
        childRoutes: [
            {
                name: t('dashboard.settings.general'),
                route: 'dashboard.settings.general',
                params: null
            },
            {
                name: t('dashboard.settings.localization'),
                route: 'dashboard.settings.localization',
                params: null
            },
            {
                name: t('dashboard.settings.analytics'),
                route: 'dashboard.settings.analytics',
                params: null
            },
            {
                name: t('dashboard.settings.mail'),
                route: 'dashboard.settings.mail',
                params: null
            },
            {
                name: t('dashboard.settings.roles'),
                route: 'dashboard.settings.roles',
                params: null
            },
            {
                name: t('dashboard.settings.one_signal'),
                route: 'dashboard.settings.onesignal',
                params: null
            },
        ]
    }
]
</script>
