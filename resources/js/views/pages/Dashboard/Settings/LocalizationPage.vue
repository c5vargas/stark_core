<template>
    <Admin>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Settings</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.settings.localization') }}</li>
            </ol>
        </nav>

        <div class="row">
            <settings-nav-tabs />

            <div class="col-7 col-md-9 ps-0">
                <div class="card">
                    <div class="card-body">

                        <h6 class="card-title">{{ $t('dashboard.settings.localization') }}</h6>

                        <form>
                            <div class="mb-3">
                                <label class="form-label">{{ $t('dashboard.settings.default_locale') }}</label>
                                <select class="form-select" v-model="form.defaultLocale" required>
                                    <option value="">- Select -</option>
                                    <option value="es">Spanish</option>
                                    <option value="en">English</option>
                                </select>
                                <small class="text-muted">{{ $t('dashboard.settings.locale_desc') }}</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">{{ $t('dashboard.settings.default_timezone') }}</label>
                                <input v-model="form.defaultTimezone" type="text" class="form-control" autocomplete="off" placeholder="Europe/Madrid">
                                <small class="text-muted">{{ $t('dashboard.settings.timezone_desc') }}</small>
                            </div>

                            <div class="mb-3">
                                <div class="form-check form-switch mb-2">
                                    <input type="checkbox" class="form-check-input" id="translations-switch">
                                    <label class="form-check-label" for="translations-switch">{{ $t('dashboard.settings.translations') }}</label>
                                </div>
                                <small class="text-muted">{{ $t('dashboard.settings.translations_desc') }}</small>
                            </div>

                            <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </Admin>
</template>

<script setup>
import Admin from "@/views/layouts/Admin";
import SettingsNavTabs from "@/views/components/Dashboard/SettingsNavTabs.vue";
import { onBeforeMount, ref } from "vue";


const app = window.AppConfig
const form = ref({})

onBeforeMount(() => {
    console.log(app)
    form.value = {...app}
})
</script>
