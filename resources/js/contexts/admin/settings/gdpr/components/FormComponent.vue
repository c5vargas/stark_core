<template>
  <div class="card mb-3">
    <div class="card-body">
      <h6 class="card-title mb-0">{{ $t('dashboard.settings.gdpr') }}</h6>
      <p class="fw-light mb-3">{{ $t('dashboard.settings.gdpr_desc') }}</p>

      <p class="mb-0">{{ $t('dashboard.settings.gdpr_long_desc') }}</p>
    </div>
  </div>

  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link border-0 active" id="cookies-tab" data-bs-toggle="tab" data-bs-target="#cookies" type="button" role="tab" aria-controls="cookies" aria-selected="true">
        {{ $t('dashboard.settings.gdpr.gdpr_cookies_page') }}
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link border-0" id="privacy-tab" data-bs-toggle="tab" data-bs-target="#privacy" type="button" role="tab" aria-controls="privacy" aria-selected="false">
        {{ $t('dashboard.settings.gdpr.gdpr_privacy_page') }}
      </button>
    </li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane fade show active" id="cookies" role="tabpanel" aria-labelledby="cookies-tab">
      <CookiesFormComponent />
    </div>
    <div class="tab-pane fade" id="privacy" role="tabpanel" aria-labelledby="privacy-tab">
      <PrivacyFormComponent />  
    </div>
  </div>
  
  
</template>

<script setup>
import PrivacyFormComponent from "@/js/contexts/admin/settings/gdpr/components/PrivacyFormComponent.vue"
import CookiesFormComponent from "@/js/contexts/admin/settings/gdpr/components/CookiesFormComponent.vue"

</script>
