<template>
    <div class="card mb-3">
        <div class="card-body">
            <h6 class="card-title mb-0">{{ $t('dashboard.settings.roles') }}</h6>
            <h6 class="text-muted mb-3">{{ $t('dashboard.settings.roles_desc') }}</h6>

            <p>{{ $t('dashboard.settings.roles_long_desc') }}</p>
        </div>
    </div>

    <div class="card mb-3" v-for="role in roles" :key="`role-${role.id}`">
        <div class="card-body">
            <h6 class="card-title">{{ role.name }}</h6>

            <ul class="list-group">
                <li v-for="perm in permissions" :key="`item-role-${role.id}-perm-${perm.id}`" class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p class="fw-bold">[{{ perm.name }}]</p>
                        <p>{{perm.descr}}</p>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input"
                            type="checkbox"
                            :id="`role-${role.id}-perm-${perm.id}`"
                            :checked="role.permissions.find(el => el.id == perm.id) ? true : false"
                            @click="handleSubmit(role, perm)">
                        <label class="form-check-label" :for="`role-${role.id}-perm-${perm.id}`">Off</label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoleStore } from "@/stores/role";

const roleStore = useRoleStore()
const roles = ref(null)
const permissions = ref(null)

onMounted( async() => {
    roles.value = [...roleStore.roles]
    permissions.value = [...roleStore.permissions]
})

function handleSubmit(role, perm) {
    const selectedRole = roles.value.find(el => el.id == role.id)
    const selectedPerm = role.permissions.find(el => el.id == perm.id)

    if(selectedPerm) { // Add or remove permission for this role
        const idx = role.permissions.findIndex(el => el.id == perm.id)
        selectedRole.permissions.splice(idx, 1)
    } else {
        selectedRole.permissions.push(perm)
    }

    roleStore.update({
        id: role.id,
        name: role.name,
        perms: selectedRole.permissions.map(el => el.id)
    })
}
</script>

<style scoped>
li.list-group-item {
    border-color: #e9e9e9;
}
</style>
