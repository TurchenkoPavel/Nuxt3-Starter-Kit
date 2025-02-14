<template>
  <div>
    <DataTable :value="statuses" tableStyle="min-width: 50rem">
      <Column field="id" header="ID" />
      <Column field="name" header="Name" /> 
      <Column header="Edited by">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <Avatar :image="avatarUrl" shape="circle" />
            <span>
              {{ slotProps.data.user.firstName }} 
              {{ slotProps.data.user.lastName }}
            </span>
          </div>
        </template>
      </Column> 
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button 
              icon="pi pi-pencil" 
              severity="warn" 
              @click="editStatus(slotProps.data.id)" 
            />
            <Button 
              icon="pi pi-trash" 
              severity="danger"    
              @click="showTemplate($event, slotProps.data.id)" 
            />
          </div>
        </template>
      </Column>
      <template #empty> No status present. </template>
    </DataTable>
    <SalesSettingsStatusesEdit 
      v-model:editVisible="editVisible" 
      :editStatusObject="editStatusObject"
      @saveStatus="updateStatus"
    />
    <ConfirmPopup group="templating">
      <template #message="slotProps">
        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
          <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
          <p>{{ slotProps.message.message }}</p>
        </div>
      </template>
    </ConfirmPopup>
  </div>
</template>

<script setup>
import { useStatusesStore } from '~/stores/statuses';
import { useUsersStore } from '~/stores/users';
import { useAvatar } from '@/composables/useAvatar';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";

const { avatarUrl, loadAvatar } = useAvatar();

const statusesStore = useStatusesStore();
const usersStore = useUsersStore();
const toast = useToast();
const confirm = useConfirm();


await statusesStore.fetchStatuses();

loadAvatar(usersStore.me?.avatar);

const statuses = computed( () => statusesStore.statuses);

const editVisible = ref(false);
const editStatusObject = ref(null);

const editStatus = (id) => {
  editStatusObject.value = statuses.value.find(status => status.id === id);
  editVisible.value = !editVisible.value; 
}

const updateStatus = async (updatedStatus) => {
  console.log(updatedStatus)
  const result = await statusesStore.updateStatus(updatedStatus.id, {
    name: updatedStatus.name, 
    editor_id: updatedStatus.editor_id
  });
  if(result.success) {
    toast.add({ severity: 'success', summary: result.message, life: 3000 });
    editVisible.value = false;
  } else {
    toast.add({ severity: 'error', summary: result.message, life: 3000 });
  }
};

const deleteStatus = async (id) => {
  const result = await statusesStore.deleteStatus(id);
  if(result.success) {
    toast.add({ severity: 'success', summary: result.message, life: 3000 });
  } else {
    toast.add({ severity: 'error', summary: result.message, life: 3000 });
  }
}
const showTemplate = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        group: 'templating',
        message: 'Please confirm to proceed moving forward.',
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            icon: 'pi pi-times',
            label: 'Cancel',
            outlined: true,
            severity: 'secondary'
        },
        acceptProps: {
            icon: 'pi pi-check',
            label: 'Confirm',
            severity: 'danger'
        },
        accept: async() => {
            await deleteStatus(id);
        }
    });
}
</script>