<template>
    <div class="card">
        <div class="card-header d-block justify-content-start d-lg-flex p-4 gap-3">
            <div class="mb-3 mb-lg-0">
                <h5 class="card-title">{{ $t('dashboard.notifications.list') }}</h5>
                <h6 class="card-subtitle text-muted">{{ $t('dashboard.notifications.list_desc') }}</h6>
            </div>

            <div class="d-flex justify-content-between ms-auto gap-3">
                <router-link
                    :to="{name:'dashboard.notifications.single', params: {id:'new'}}"
                    class="btn btn-primary wd-115 d-flex justify-content-between align-items-center">
                    {{ $t('dashboard.notifications.new') }}
                    <i class="ms-2 bi bi-plus-lg"></i>
                </router-link>
                <div class="input-group wd-150">
                    <input type="text" v-model="notifyStore.search" class="form-control" placeholder="Search...">
                    <button class="btn btn-outline-primary">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr class="d-none d-md-table-row">
                            <th scope="col">{{ $t('common.name') }}</th>
                            <th scope="col">{{ $t('common.email') }}</th>
                            <th scope="col">{{ $t('common.created_at') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <transition-group name="list">
                            <tr v-for="(item, i) in notifyStore.usersPaginated" :key="`notification-item-${i}`">
                                <td class="align-middle">{{ item.headings.en }}</td>
                                <td class="align-middle d-none d-md-table-cell">{{ item.contents.en }}</td>
                                <td class="align-middle d-none d-md-table-cell">{{ formatIsoDate(item.send_after ? item.send_after : item.queued_at) }}</td>
                                <td class="align-middle text-end">
                                    <buttons-table
                                        :canUpdate="true"
                                        :canDelete="true"
                                        @on-update="$router.push({
                                            name: 'dashboard.users.single',
                                            params: {id: user.id}
                                        })"
                                        @on-delete="notifyStore.destroy(user.id)" />
                                </td>
                            </tr>
                        </transition-group>
                    </tbody>
                </table>
                <pagination
                    @on-change="notifyStore.setPage"
                    :itemsPerPage="notifyStore.itemsPerPage"
                    :items="notifyStore.notifications" />
            </div>
        </div>
    </div>

</template>

<script setup>
import { formatIsoDate } from "@/plugins/moment";
import { useUserStore } from "@/stores/user";
import ButtonsTable from "../Shared/ButtonsTable.vue";
import Pagination from "@/views/components/Shared/Pagination.vue";
const notifyStore = useUserStore()
</script>

<style scoped>
.wd-115 {
    width: 115px!important;
}
</style>
