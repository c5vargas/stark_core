<template>
    <Admin>
        <nav class="page-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name:'dashboard.notifications'}">{{ $t('dashboard.notifications') }}</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ id === 'new' ? $t('dashboard.notifications.create') : $t('dashboard.notifications.update') }}
                </li>
            </ol>
        </nav>

        <transition name="fade" appear>
            <div class="row">
                <div class="col-md-6 col-sm-12" v-if="notification">
                    <notification-form
                        :key="notification.id"
                        :notification="notification"
                        @on-submit="saveData"
                        @on-update="updateValues"
                        @on-delete="deleteOrCancel" />
                </div>

                <div class="col-md-6 col-sm-12">
                    <device-component :notification="notification" />
                </div>
            </div>
        </transition>
    </Admin>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useNotifyStore } from "@/stores/notify";
import Admin from "@/views/layouts/Admin";
import NotificationForm from "@/views/components/Notifications/NotificationForm.vue";
import DeviceComponent from "@/views/components/Notifications/DeviceComponent.vue";

const router = useRouter()
const notifyStore = useNotifyStore()
const props = defineProps({
    id: {
        required: true,
    }
})
const notification = ref(null)

onBeforeMount(async() => {
    notification.value = await init()
})

watch(() => props.id, async(first, second) => {
    notification.value = await init()
})

async function init() {
    if(props.id === 'new') {
        return notification.value = {
            id: 'new',
            headings: {en: ''},
            contents: {en: ''},
        }
    }
    return await notifyStore.find(props.id)
}

function updateValues(newValue) {
    notification.value = newValue
}

async function deleteOrCancel() {
    if(props.id === 'new')
        return router.push({name: 'dashboard.notifications'});

    const resp = await notifyStore.destroy(props.id)

    if(resp)
        router.push({name: 'dashboard.notifications'})
}

async function saveData(payload) {
    const resp = user.value.id === 'new'
        ? await notifyStore.create(payload)
        : await notifyStore.update(payload)

    if(resp)
        router.push({name: 'dashboard.notifications'})
}
</script>
