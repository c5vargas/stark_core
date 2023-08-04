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
                <li class="nav-item nav-category">Main</li>
                <li class="nav-item">
                    <router-link :to="{name:'dashboard'}" class="nav-link">
                        <i class="link-icon bi bi-grid"></i>
                        <span class="link-title">Dashboard</span>
                    </router-link>
                </li>
                <li class="nav-item nav-category">web apps</li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#users" role="button" aria-expanded="false"
                        aria-controls="users">
                        <i class="link-icon bi bi-people"></i>
                        <span class="link-title">{{$t('dashboard.users')}}</span>
                        <i class="link-arrow bi bi-chevron-down"></i>
                    </a>
                    <div class="collapse" id="users">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <router-link :to="{name: 'dashboard.users'}" class="nav-link">{{$t('dashboard.users.list')}}</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'dashboard.users'}" class="nav-link">{{$t('dashboard.users.create')}}</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="../../pages/apps/chat.html" class="nav-link">
                        <i class="link-icon bi bi-chat"></i>
                        <span class="link-title">Chat</span>
                    </a>
                </li>
                <li class="nav-item nav-category">{{ $t('dashboard.settings.settings') }}</li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings">
                        <i class="link-icon bi bi-gear"></i>
                        <span class="link-title">{{ $t('dashboard.settings.settings') }}</span>
                        <i class="link-arrow bi bi-chevron-down"></i>
                    </a>
                    <div class="collapse" id="settings">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <router-link :to="{name:'dashboard.settings.general'}" class="nav-link">{{ $t('dashboard.settings.general') }}</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'dashboard.settings.localization'}" class="nav-link">{{ $t('dashboard.settings.localization') }}</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'dashboard.settings.analytics'}" class="nav-link">{{ $t('dashboard.settings.analytics') }}</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'dashboard.settings.mail'}" class="nav-link">{{ $t('dashboard.settings.mail') }}</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>
