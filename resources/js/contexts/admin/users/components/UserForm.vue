<template>
    <form @submit.prevent="handleSubmit">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title">{{ form.id === 'new' ? $t('dashboard.users.create') : $t('dashboard.users.update') }}</h6>
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

                <buttons-form
                    :id="user.id"
                    @on-cancel="$router.push({name: 'dashboard.users'})"
                    @on-submit="handleSubmit"
                    @on-delete="handleDelete" />
            </div>
        </div>
    </form>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import ButtonsForm from "@/js/contexts/admin/shared/components/ButtonsForm.vue";
const emits = defineEmits(['on-submit', 'on-delete'])
const props = defineProps({
    user: {
        required: true,
        type: Object
    }
})

const form = ref({})

onBeforeMount( async() => {
    form.value = {...props.user}
})

function handleSubmit() {
    emits('on-submit', form.value)
}

function handleDelete() {
    emits('on-delete')
}
</script>
