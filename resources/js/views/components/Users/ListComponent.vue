<template>
    <div class="card">
        <div class="card-header d-block justify-content-start d-lg-flex p-4 gap-3">
            <div class="mb-3 mb-lg-0">
                <h5 class="card-title">{{ $t('dashboard.users.list') }}</h5>
                <h6 class="card-subtitle text-muted">{{ $t('dashboard.users.list_desc') }}</h6>
            </div>

            <div class="d-flex justify-content-between ms-auto gap-3">
                <router-link
                    :to="{name:'dashboard.users.single', params: {id:'new'}}"
                    class="btn btn-primary wd-115 d-flex justify-content-between align-items-center">
                    New user
                    <i class="ms-2 bi bi-plus-lg"></i>
                </router-link>
                <div class="input-group wd-150">
                    <input type="text" v-model="usrStore.search" class="form-control" placeholder="Search...">
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
                            <th scope="col" colspan="2">{{ $t('common.name') }}</th>
                            <th scope="col">{{ $t('common.email') }}</th>
                            <th scope="col">{{ $t('common.created_at') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usrStore.usersPaginated" :key="user.id">
                            <td class="align-middle">
                                <img :src="`https://i.pravatar.cc/36?id=${user.id}`" class="rounded-circle" :alt="user.name">
                            </td>
                            <td class="align-middle">{{ user.name }}</td>
                            <td class="align-middle d-none d-md-table-cell">{{ user.email }}</td>
                            <td class="align-middle d-none d-md-table-cell">{{ dateFormatted(user.created_at) }}</td>
                            <td class="align-middle text-end">
                                <buttons-table
                                    :canUpdate="true"
                                    :canDelete="true"
                                    @on-update="$router.push({
                                        name: 'dashboard.users.single',
                                        params: {id: user.id}
                                    })"
                                    @on-delete="usrStore.destroy(user.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination
                    @on-change="usrStore.setPage"
                    :itemsPerPage="usrStore.itemsPerPage"
                    :items="usrStore.users" />
            </div>
        </div>
    </div>

</template>

<script setup>
import Pagination from "@/views/components/Shared/Pagination.vue";
import { useUserStore } from "@/stores/user";
import { dateFormatted } from "@/plugins/moment";
import ButtonsTable from "../Shared/ButtonsTable.vue";
const usrStore = useUserStore()
</script>

<style scoped>
.wd-115 {
    width: 115px!important;
}
</style>
