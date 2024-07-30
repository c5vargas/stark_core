<template>
	<div class="card mb-3">
	  <div class="card-body">
      <h6 class="card-title mb-0">{{ $t('dashboard.settings.gdpr.gdpr_cookies_page') }}</h6>
      <form @submit.prevent="handleSubmit">
        <div id="cookies-editorjs" />
        
        <div class="mb-3">
          <div class="form-check form-switch mb-2">
              <input type="checkbox" v-model="form.gdpr_show_cookie_banner" class="form-check-input" id="gdpr_banner-switch">
              <label class="form-check-label" for="gdpr_banner-switch">{{ $t('dashboard.settings.gdpr_show_cookie_banner') }}</label>
          </div>
          <small class="text-muted">{{ $t('dashboard.settings.gdpr_show_cookie_banner_desc') }}</small>
        </div>

        <div class="d-flex align-items-center justify-content-start gap-2">
          <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
          <a href="/cookies-policy" target="_blank">
            {{ $t('dashboard.settings.gdpr.gdpr_anchor') }} <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </form>
	  </div>
	</div>
</template>
  
<script setup>
  import { onMounted, ref } from "vue"
  import useSettingsStore from "@/js/contexts/admin/settings/general/stores/useSettingsStore"
  
  import EditorJS from '@editorjs/editorjs'
  import Header from '@editorjs/header'
  import Table from '@editorjs/table'
  import RawTool from '@editorjs/raw';
  
  const settingStore = useSettingsStore()
  const form = ref({})
  
  let editor
  
  onMounted( async() => {
    form.value = {
      gdpr_show_cookie_banner: settingStore.settings.gdpr_show_cookie_banner === "1" ? true : false,
      gdpr_cookies_page: JSON.parse(settingStore.settings?.gdpr_cookies_page || '')
    }
    
    editor = new EditorJS({
      tools: {
      header: {
        class: Header,
        inlineToolbar: true,
        config: {
        levels: [2, 3, 4],
        defaultLevel: 3
        }
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
        rows: 2,
        cols: 3,
        },
      },
      raw: RawTool,
      },
      holder: 'cookies-editorjs',
      minHeight: 35,
      data: form.value.gdpr_cookies_page
    })
  })
  
  async function handleSubmit() {
    const data = await editor.save()
    
    settingStore.update({
      ...form.value,
      gdpr_cookies_page: JSON.stringify(data)
    })
  }
</script>
  