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

                <div class="mb-3 datepicker">
                    <label class="form-label">{{ $t('dashboard.notifications.form.date') }}</label>
                    <VDatePicker v-model="date" :popover="false" mode="dateTime" is24hr :time-accuracy="2" hide-time-header>
                        <template #default="{ togglePopover, inputValue, inputEvents }">
                            <div class="d-flex align-items-center rounded-lg border rounded overflow-hidden" @click="() => togglePopover()">
                                <button
                                    type="button"
                                    class="btn btn-sm px-2 mx-1">
                                    <i class="bi bi-calendar"></i>
                                </button>
                                <input
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    class="px-1 border-0 form-control"
                                />
                            </div>
                        </template>
                    </VDatePicker>
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
import { dateFormatted, timeFormatted } from "@/plugins/moment.js"
import { onBeforeMount, ref } from "vue";
import ButtonsForm from "@/views/components/Shared/ButtonsForm.vue";

const emits = defineEmits(['on-submit', 'on-delete', 'on-update'])
const props = defineProps({
    notification: {
        required: true,
        type: Object
    }
})

const date = ref(new Date())
const form = ref({})

function onUpdateValue() {
    emits('on-update', form.value)
}

onBeforeMount( async() => {
    form.value = {...props.notification}
})

function handleSubmit() {
    form.value.delivery_time_of_day = dateFormatted(date.value)
    form.value.send_after = timeFormatted(date.value)
    emits('on-submit', form.value)
}

function handleDelete() {
    emits('on-delete')
}
</script>

<style scoped>
.datepicker :deep(.vc-time-select-group select) {
    border: 0!important;
}
</style>
