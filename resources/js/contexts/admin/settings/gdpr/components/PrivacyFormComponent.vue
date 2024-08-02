<template>
	<div class="card mb-3">
	  <div class="card-body">
      <h6 class="card-title mb-0">{{ $t('dashboard.settings.gdpr.gdpr_privacy_page') }}</h6>
      <form @submit.prevent="handleSubmit">
        <div id="privacy-editorjs" />
        
        <div class="d-flex align-items-center justify-content-start gap-2">
          <button type="submit" class="btn btn-primary me-2">{{ $t('dashboard.settings.update') }}</button>
          <a href="/privacy-policy" target="_blank">
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
      gdpr_privacy_page: JSON.parse(settingStore.settings?.gdpr_privacy_page || '')
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
      holder: 'privacy-editorjs',
      minHeight: 35,
      data: form.value.gdpr_privacy_page
    })
  })
  
  async function handleSubmit() {
    const data = await editor.save()
    
    settingStore.update({
      ...form.value,
      gdpr_privacy_page: JSON.stringify(data)
    })
  }
</script>
  