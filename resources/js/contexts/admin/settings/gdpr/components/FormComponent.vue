<template>
  <div class="card mb-3">
    <div class="card-body">
      <h6 class="card-title mb-0">{{ $t('dashboard.settings.gdpr') }}</h6>
      <p class="fw-light mb-3">{{ $t('dashboard.settings.gdpr_desc') }}</p>

      <p class="mb-0">{{ $t('dashboard.settings.gdpr_long_desc') }}</p>
    </div>
  </div>
  
  <PrivacyFormComponent />
  
  <CookiesFormComponent />
</template>

<script setup>
import PrivacyFormComponent from "@/js/contexts/admin/settings/gdpr/components/PrivacyFormComponent.vue"
import CookiesFormComponent from "@/js/contexts/admin/settings/gdpr/components/CookiesFormComponent.vue"

</script>
