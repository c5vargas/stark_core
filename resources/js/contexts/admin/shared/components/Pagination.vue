<template>
    <nav class="mt-3" aria-label="Table Navigation">
        <ul class="pagination justify-content-end">
            <li class="page-item" :class="page === 1 ? 'disabled' : ''">
                <a class="page-link" href="javascript:void(0)" @click="prev()">
                    <i class="bi bi-chevron-left"></i>
                </a>
            </li>

            <li class="page-item" v-if="page != 1">
                <a class="page-link" href="javascript:void(0)" @click="select(page - 1)">{{ page - 1 }}</a>
            </li>

            <li class="page-item active">
                <a class="page-link" href="javascript:void(0)">{{ page }}</a>
            </li>

            <li class="page-item" v-if="(page) != getNumbers">
                <a class="page-link" href="javascript:void(0)" @click="select(page + 1)">
                    {{ page + 1 }}
                </a>
            </li>

            <li class="page-item" :class="page === getNumbers ? 'disabled' : ''">
                <a class="page-link" href="javascript:void(0)" @click="next()">
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import {computed, ref} from 'vue'

const emits = defineEmits(['on-change'])
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    }
})

const page = ref(1)

function next() {
    if(page.value === getNumbers.value)
        return null

    page.value++
    emits('on-change', page.value)
}

function prev() {
    if(page.value === 1)
        return null

    page.value--
    emits('on-change', page.value)
}

function select(number) {
    page.value = number
    emits('on-change', page.value)
}

const getNumbers = computed(() => Math.ceil(props.items.length / props.itemsPerPage))

</script>

