<template>
    <button class="btn btn-sm btn-link" v-if="canUpdate" @click="$emit('on-update', id)">
        <i class="bi bi-pen"></i>
    </button>

    <button class="btn btn-sm btn-link" v-if="canDelete" @click="onDelete">
        <i class="bi bi-trash"></i>
    </button>
</template>

<script setup>
import Swal from 'sweetalert2';
import {useI18n} from 'vue-i18n';

const {t} = useI18n()
const emits = defineEmits(['on-update', 'on-delete'])
const props = defineProps({
    canUpdate: {
        required: true,
        type: Boolean
    },
    canDelete: {
        required: true,
        type: Boolean
    },
    id: {
        default: 0
    }
})

async function onDelete() {
    const title = t('common.delete_title')
    const text = t('common.delete_text')
    const confirmButtonText = t('buttons.confirm')
    const cancelButtonText = t('buttons.cancel')

    const resp = await await Swal.fire({
        title,
        text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText
    })

    if(resp)
        emits('on-delete', props.id)
}
</script>
