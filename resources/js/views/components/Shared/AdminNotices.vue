<template>
    <div class="alert border-0 shadow-sm alert-dismissible fade show" :class="`alert-${notice.type}`" role="alert">
        <h4 class="alert-heading">{{ notice.title }}</h4>
        <p>{{ notice.message }}</p>

        <template v-if="notice.optional">
            <hr>
            <p class="mb-0 small">{{ notice.optional }}</p>
        </template>

        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="btn-close" @click="$emit('on-cancel', notice.id)"></button>
    </div>
</template>

<script setup>

const emits = defineEmits(['on-cancel'])
const props = defineProps({
    notice: {
        default: []
    },
})

</script>

