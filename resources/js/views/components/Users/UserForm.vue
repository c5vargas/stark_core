<template>
    <form @submit.prevent="handleSubmit">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title">{{ $t('dashboard.users.create') }}</h6>
                <div class="mb-3">
                    <label class="form-label">{{ $t('common.name') }}</label>
                    <input v-model="form.name" type="text" class="form-control" autocomplete="off" required placeholder="John Doe...">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('common.email') }}</label>
                    <input v-model="form.email" type="text" class="form-control" autocomplete="off" required placeholder="email@example.com">
                </div>

                <div class="mb-3">
                    <label class="form-label">{{ $t('common.password') }}</label>
                    <input v-model="form.password" type="password" class="form-control" autocomplete="off" placeholder="********">
                </div>

                <div class="d-flex justify-content-start">
                    <button type="submit" class="btn btn-danger me-2">
                        {{ $t('buttons.delete') }} <i class="ms-1 bi bi-trash"></i>
                    </button>
                    <button type="submit" class="btn btn-primary me-2">
                        {{ $t('buttons.save_changes') }} <i class="ms-1 bi bi-check"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

const form = ref({})
const emits = defineEmits(['on-submit'])
const props = defineProps({
    user: {
        required: true,
        type: Object
    }
})

onBeforeMount( async() => {
    form.value = {...props.user}
})

function handleSubmit() {
    emits('on-submit', form.value)
}
</script>
