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
                    <a class="nav-link" data-bs-toggle="collapse" href="#emails" role="button" aria-expanded="false"
                        aria-controls="emails">
                        <i class="link-icon bi bi-envelope"></i>
                        <span class="link-title">Email</span>
                        <i class="link-arrow bi bi-chevron-down"></i>
                    </a>
                    <div class="collapse" id="emails">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="../../pages/email/inbox.html" class="nav-link">Inbox</a>
                            </li>
                            <li class="nav-item">
                                <a href="../../pages/email/read.html" class="nav-link">Read</a>
                            </li>
                            <li class="nav-item">
                                <a href="../../pages/email/compose.html" class="nav-link">Compose</a>
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
                <li class="nav-item">
                    <a href="../../pages/apps/calendar.html" class="nav-link">
                        <i class="link-icon bi bi-calendar"></i>
                        <span class="link-title">Calendar</span>
                    </a>
                </li>
                <li class="nav-item nav-category">Settings</li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings">
                        <i class="link-icon bi bi-gear"></i>
                        <span class="link-title">Settings</span>
                        <i class="link-arrow bi bi-chevron-down"></i>
                    </a>
                    <div class="collapse" id="settings">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <router-link :to="{name:'dashboard.settings.general'}" class="nav-link">General</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'dashboard.settings.localization'}" class="nav-link">Localization</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>
