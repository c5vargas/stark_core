<template>
    <div class="d-flex justify-content-start">
        <button v-if="canCancel && (!canDelete || id == 'new')" type="button" class="btn btn-outline-primary me-2" @click="$emit('on-cancel')">
            {{ $t('buttons.cancel') }}
            <i class="ms-1 bi bi-caret-left"></i>
        </button>

        <button v-if="canDelete && id != 'new'" type="button" class="btn btn-danger me-2" @click="onDelete">
            {{ $t('buttons.delete') }}
            <i class="ms-1 bi bi-trash"></i>
        </button>

        <button v-if="canSubmit" type="submit" class="btn btn-primary me-2" @click="$emit('on-submit', id)">
            {{ $t('buttons.save_changes') }} <i class="ms-1 bi bi-check"></i>
        </button>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import {useI18n} from 'vue-i18n';

const {t} = useI18n()
const emits = defineEmits(['on-submit', 'on-delete', 'on-cancel'])
const props = defineProps({
    canSubmit: {
        default: true,
        type: Boolean
    },
    canDelete: {
        default: true,
        type: Boolean
    },
    canCancel: {
        default: true,
        type: Boolean
    },
    id: {
        default: null
    }
})

async function onDelete() {
    const title = t('common.delete_title')
    const text = t('common.delete_text')
    const confirmButtonText = t('buttons.confirm')
    const cancelButtonText = t('buttons.cancel')

    const {isConfirmed} = await Swal.fire({
        title,
        text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText
    })

    if(isConfirmed)
        emits('on-delete', props.id)
}
</script>
