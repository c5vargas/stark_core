<template>
  <div class="card mb-3">
    <div class="card-body">
      <h6 class="card-title mb-0">{{ $t('dashboard.settings.mail') }}</h6>
      <p class="fw-light mb-3">{{ $t('dashboard.settings.mail_desc') }}</p>

      <p class="mb-0">{{ $t('dashboard.settings.mail_long_desc') }}</p>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">{{ $t('dashboard.settings.mail.from_address') }}</label>
          <input v-model="form.mail_from_address" type="email" class="form-control">
          <small class="text-muted">{{ $t('dashboard.settings.mail.from_address_desc') }}</small>
        </div>

        <div class="mb-3">
          <label class="form-label">{{ $t('dashboard.settings.mail.contact_address') }}</label>
          <input v-model="form.mail_contact_address" type="email" class="form-control">
          <small class="text-muted">{{ $t('dashboard.settings.mail.contact_address_desc') }}</small>
        </div>

        <div class="mb-3">
          <label class="form-label">{{ $t('dashboard.settings.mail.from_name') }}</label>
          <input v-model="form.mail_from_name" type="text" class="form-control">
          <small class="text-muted">{{ $t('dashboard.settings.mail.from_name_desc') }}</small>
        </div>

        <hr />

        <div class="mb-3 mt-3">
          <label class="form-label">{{ $t('dashboard.settings.mail.driver') }}</label>
          <select class="form-select" value="SMTP" disabled readonly>
            <option value="SMTP">SMTP</option>
          </select>
        </div>

        <div class="d-block d-md-flex gap-3">
          <div class="mb-3 w-100">
            <label class="form-label">{{ $t('dashboard.settings.mail.username') }}</label>
            <input v-model="form.mail_username" type="text" class="form-control">
          </div>

          <div class="mb-3 w-100">
            <label class="form-label">{{ $t('dashboard.settings.mail.password') }}</label>
            <input v-model="form.mail_password" type="text" class="form-control">
          </div>
        </div>

        <div class="d-block d-md-flex gap-3">
          <div class="mb-3 w-100">
            <label class="form-label">{{ $t('dashboard.settings.mail.host') }}</label>
            <input v-model="form.mail_host" type="text" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">{{ $t('dashboard.settings.mail.port') }}</label>
            <input v-model="form.mail_port" type="text" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">{{ $t('dashboard.settings.mail.encryption') }}</label>
            <input v-model="form.mail_encryption" type="text" class="form-control">
          </div>
        </div>

        <div class="d-grid d-md-block">
          <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { swalToast } from "@/js/plugins/swal.js"
import { useI18n } from "vue-i18n";
import useSettingsStore from "@/js/contexts/admin/settings/general/stores/useSettingsStore";

const {t} = useI18n()
const settingStore = useSettingsStore()
const form = ref({})

onMounted(async () => {
  form.value = {
    mail_from_address: settingStore.settings.mail_from_address,
    mail_contact_address: settingStore.settings.mail_contact_address,
    mail_from_name: settingStore.settings.mail_from_name,
    mail_driver: settingStore.settings.mail_driver,
    mail_host: settingStore.settings.mail_host,
    mail_port: settingStore.settings.mail_port,
    mail_encryption: settingStore.settings.mail_encryption,
    mail_username: settingStore.settings.mail_username,
    mail_password: settingStore.settings.mail_password,
  }
})

function handleSubmit() {
  const fromDomain = form.value.mail_from_address.replace(/.*@/, "")
  const smtpDomain = form.value.mail_username.replace(/.*@/, "")

  if(fromDomain !== smtpDomain)
    return swalToast(t('dashboard.settings.mail.validation.domain.title'), "error", 6000, t('dashboard.settings.mail.validation.domain.text'))

  settingStore.update(form.value)
}
</script>
