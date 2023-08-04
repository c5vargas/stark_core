<template>
    <div class="card">
        <div class="card-header d-block d-md-flex p-4 gap-3">
            <div class="w-100 mb-3 mb-md-0">
                <h5 class="card-title">{{ $t('dashboard.users.list') }}</h5>
                <h6 class="card-subtitle text-muted">{{ $t('dashboard.users.list_desc') }}</h6>
            </div>

            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search something...">
                <button class="btn btn-outline-primary">
                    <i class="bi bi-search"></i>
                </button>
            </div>

        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col" colspan="2">{{ $t('common.name') }}</th>
                            <th scope="col">{{ $t('common.email') }}</th>
                            <th scope="col">{{ $t('common.created_at') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usrStore.users" :key="user.id" @click="checkItem(user.id)">
                            <td class="align-middle">
                                <img :src="`https://i.pravatar.cc/300?id=${user.id}`" class="rounded-circle wd-35" :alt="user.name">
                            </td>
                            <td class="align-middle">{{ user.name }}</td>
                            <td class="align-middle">{{ user.email }}</td>
                            <td class="align-middle">{{ user.created_at }}</td>
                            <td class="align-middle text-end">
                                <button class="btn btn-sm btn-link">
                                    <i class="ms-2 bi bi-pen"></i>
                                </button>

                                <button class="btn btn-sm btn-link">
                                    <i class="ms-2 bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <nav class="mt-3" aria-label="Table Navigation">
                    <ul class="pagination justify-content-end">
                        <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useUserStore } from "@/stores/user";
const usrStore = useUserStore()
</script>
