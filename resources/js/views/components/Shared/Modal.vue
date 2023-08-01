<template>
    <div class="modal fade show" style="display: block;" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                <button type="button" class="btn-close" @click="$emit('on-cancel')"></button>
            </div>
            <div class="modal-body">
                <slot />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$emit('on-cancel')">{{$t('buttons.cancel')}}</button>
                <button type="button" class="btn btn-primary" @click="$emit('on-submit')">{{ $t('buttons.save_changes') }}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['on-submit', 'on-cancel'])
const props = defineProps({
    title: {
        type: String,
        default: "Modal title"
    }
})
</script>

<style scoped>
.modal {
    background-color: rgb(0 0 0 / 35%);
}
.modal-dialog {
    top: 50%;
    transform: translateY(-50%)!important;
}

.modal-body {
    min-height: 150px;
}
</style>
