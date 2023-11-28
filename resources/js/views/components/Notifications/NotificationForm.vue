<template>
    <form @submit.prevent="handleSubmit">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title">{{ form.id === 'new' ? $t('dashboard.notifications.create') : $t('dashboard.notifications.update') }}</h6>

                <div class="mb-3">
                    <label class="form-label">{{ $t('common.title') }}</label>
                    <input v-model="form.headings.en" type="text" class="form-control" autocomplete="off" required @input="onUpdateValue">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('common.description') }}</label>
                    <textarea v-model="form.contents.en" class="form-control" rows="2" required @input="onUpdateValue" />
                </div>

                <buttons-form
                    :id="notification.id"
                    @on-cancel="$router.push({name: 'dashboard.notifications'})"
                    @on-submit="handleSubmit"
                    @on-delete="handleDelete" />
            </div>
        </div>
    </form>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import ButtonsForm from "@/views/components/Shared/ButtonsForm.vue";

const emits = defineEmits(['on-submit', 'on-delete', 'on-update'])
const props = defineProps({
    notification: {
        required: true,
        type: Object
    }
})

const form = ref({})

function onUpdateValue() {
    emits('on-update', form.value)
}

onBeforeMount( async() => {
    form.value = {...props.notification}
})

function handleSubmit() {
    emits('on-submit', form.value)
}

function handleDelete() {
    emits('on-delete')
}
</script>
