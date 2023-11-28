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
                            <th scope="col"></th>
                            <th scope="col">{{ $t('common.created_at') }}</th>
                            <th scope="col">{{ $t('common.stats') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <transition-group name="list">
                            <tr v-for="item in notifyStore.notificationsPaginated" :key="`notification-${item.id}`">
                                <td class="align-middle">
                                    <p class="mb-0 fw-bold">{{ item.headings.en }}</p>
                                    <p class="mb-0">{{ item.contents.en }}</p>
                                </td>

                                <td class="align-middle d-none d-md-table-cell">
                                    {{ formatIsoDate(item.send_after ? item.send_after : item.queued_at) }}
                                </td>
                                <td class="align-middle d-none d-md-table-cell">
                                    <div class="d-flex pointer">
                                        <span class="me-2 pointer" data-toggle="tooltip" data-placement="top" :title="$t('dashboard.notifications.successful')">
                                            <i class="bi bi-send"></i> {{ item.successful || 0 }}
                                        </span>

                                        <span class="me-2 pointer" data-toggle="tooltip" data-placement="top" :title="$t('dashboard.notifications.failed')">
                                            <i class="bi bi-send-x"></i> {{ item.failed || 0 }}
                                        </span>

                                        <span class="pointer" data-toggle="tooltip" data-placement="top" :title="$t('dashboard.notifications.converted')">
                                            <i class="bi bi-hand-index-thumb"></i> {{ item.converted || 0 }}
                                        </span>
                                    </div>
                                </td>
                                <td class="align-middle text-end">
                                    <buttons-table
                                        :canUpdate="true"
                                        :canDelete="true"
                                        @on-update="$router.push({
                                            name: 'dashboard.users.single',
                                            params: {id: item.id}
                                        })"
                                        @on-delete="notifyStore.destroy(item.id)" />
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
import { useNotifyStore } from "@/stores/notify";
import ButtonsTable from "../Shared/ButtonsTable.vue";
import Pagination from "@/views/components/Shared/Pagination.vue";
const notifyStore = useNotifyStore()

</script>

<style scoped>
.wd-115 {
    width: 115px!important;
}
</style>
