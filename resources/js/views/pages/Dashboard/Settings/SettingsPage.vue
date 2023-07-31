<template>
    <Admin>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">{{ $t('dashboard.settings.settings') }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard.settings.general') }}</li>
            </ol>
        </nav>

        <div class="row">
            <settings-nav-tabs />

            <div class="col-7 col-md-9 ps-0">
                <div class="card">
                    <div class="card-body">

                        <h6 class="card-title">{{ $t('dashboard.settings.general') }}</h6>

                        <form>
                            <div class="mb-3">
                                <label class="form-label">{{ $t('dashboard.settings.site_url') }}</label>
                                <input type="text" readonly disabled class="form-control" autocomplete="off" placeholder="https://site.url" :value="app.url">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">{{ $t('dashboard.settings.site_name') }}</label>
                                <input v-model="form.name" type="text" class="form-control" autocomplete="off" :placeholder="$t('dashboard.settings.site_name')">
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
    form.value = {...app}
})
</script>
