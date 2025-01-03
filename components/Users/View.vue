<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">User Management</h2>
    <DataTable
      :value="users"
      class="p-datatable-sm"
      size="large"
      stripedRows
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20]"
    >
     <template #header>
        <div class="flex justify-end gap-4 w-full">
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
            <Button label="Create" severity="success" icon="pi pi-plus" @click="navigateTo(`${$route.path}/create`)" />
        </div>
      </template>
      <Column field="id" header="ID" sortable />
      <Column field="firstName" header="First Name" sortable />
      <Column field="lastName" header="Last Name" sortable />
      <Column field="email" header="Email" sortable />
      <Column field="role" header="Role" sortable />
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button 
              icon="pi pi-pencil" 
              severity="warning" 
              :disabled="data.role === 'superadmin' && userMe.role !== 'superadmin'" 
              @click="editUser(data.id)" />
            <Button 
              icon="pi pi-trash" 
              severity="danger" 
              :disabled="data.role === 'superadmin' && userMe.role !== 'superadmin'" 
              @click="deleteUserConfirm($event, data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <ConfirmPopup group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="rounded p-4">
          <span>{{ message.message }}</span>
          <div class="flex items-center gap-2 mt-4">
            <Button label="Cancel" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
            <Button label="Delete" severity="danger" @click="acceptCallback" size="small"></Button>
          </div>
        </div>
      </template>
    </ConfirmPopup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useRoute, navigateTo } from '#app';
import { useConfirm } from "primevue/useconfirm";
import { useUsersStore } from '~/stores/users';
import { useToast } from 'primevue/usetoast';

const $route = useRoute();
const usersStore = useUsersStore();
const confirm = useConfirm();
const toast = useToast();

const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const users = computed(() => usersStore.users);
const userMe = computed(() => usersStore.me);

const editUser = (id) => {
  navigateTo(`${$route.path}/${id}`)
}

const deleteUserConfirm = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Delete user?',
    accept: () => {
      deleteUser(id)
    },
    reject: () => {
    }
  });
}

const deleteUser = async (userId) => {
  const { success, message } = await usersStore.deleteUser(userId);

  if (success) {
    toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }
}

if (import.meta.client) {
  usersStore.fetchUsers();
} 
</script>