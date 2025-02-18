<template>
  <div>
    <Button label="Create Status" severity="success" icon="pi pi-plus" @click="showCreateStatusPopup" />
    <Dialog v-model:visible="createVisible" 
      modal 
      header="Create Status" 
      :style="{ width: '25rem' }"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="name" id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="createVisible = false"></Button>
        <Button type="button" label="Save" @click="createStatus"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { useStatusesStore } from '~/stores/statuses';
import { useUsersStore } from '~/stores/users';
import { useToast } from 'primevue/usetoast';

const statusesStore = useStatusesStore();
const usersStore = useUsersStore();
const toast = useToast();

const me = usersStore.me;

const createVisible = ref(false);
const name = ref('');

const showCreateStatusPopup = () => {
  createVisible.value = !createVisible.value
}
const createStatus = async() =>{
  const result = await statusesStore.createStatus({
    name: name.value,
    editor_id: me.id
  })
  if(result.success) {
    toast.add({ severity: 'success', summary: result.message, life: 3000 });
    createVisible.value = false;
    name.name = '';
    statusesStore.fetchStatuses();
  } else {
    toast.add({ severity: 'error', summary: result.message, life: 3000 });
  }
}
</script>