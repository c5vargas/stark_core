<template>
    <Admin>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name:'dashboard.users'}">{{ $t('dashboard.users') }}</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ id === 'new' ? $t('dashboard.users.create') : $t('dashboard.users.update') }}
                </li>
            </ol>
        </nav>

        <div class="row">
            <transition name="fade" appear>
                <div class="col-12" v-if="user">
                    <user-form
                        :key="user.id"
                        :user="user"
                        @on-submit="saveData" />
                </div>
            </transition>
        </div>
    </Admin>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import Admin from "@/views/layouts/Admin";
import UserForm from "@/views/components/Users/UserForm.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const usrStore = useUserStore()
const props = defineProps({
    id: {
        required: true,
    }
})
const user = ref(null)

onBeforeMount(async() => {
    user.value = await init()
})

watch(() => props.id, async(first, second) => {
    user.value = await init()
})

async function init() {
    if(props.id === 'new') {
        return user.value = {
            id: 'new',
            name: '',
            email: ''
        }
    }
    return await usrStore.find(props.id)
}

async function saveData(payload) {
    const resp = user.value.id === 'new'
    ? await usrStore.create(payload)
    : await usrStore.update(payload)

    if(resp)
        router.push({name: 'dashboard.users'})
}
</script>
