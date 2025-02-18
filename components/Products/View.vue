<template>
  <Card>
    <template #content>
      <div class="flex justify-between gap-2 mb-2">
        <h1 class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Products</h1>
        <Button v-if="checkRole" class="ml-auto" label="Create Product" severity="success" icon="pi pi-plus" @click="redirectToProductCreate" />
      </div>
      <div>
        <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="description" header="Description" /> 
          <Column field="price" header="Price" /> 
          <Column field="quantity" header="Quantity" />
          <Column field="currency" header="Currency" />
          <Column field="discount" header="Discount" />
          <Column header="Edited by">
            <template #body="slotProps">  
              <div class="flex items-center gap-2"> 
                <Avatar :image="avatarUrl" shape="circle" />
                <span>
                  {{ slotProps.data.user.firstName }} {{ slotProps.data.user.lastName }}
                </span>
              </div>
            </template>
          </Column>
          <Column class="w-[100px]" header="Actions">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button 
                  icon="pi pi-pencil" 
                  severity="warn" 
                  @click="editProduct(slotProps.data.id)"></Button>
                <Button 
                  icon="pi pi-trash" 
                  severity="danger"    
                  @click="showTemplate($event, slotProps.data.id)" ></Button>
              </div>
            </template>
          </Column>
        </DataTable> 
      </div> 
      <ConfirmPopup group="templating"> 
        <template #message="slotProps">
          <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
            <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
            <p>{{ slotProps.message.message }}</p>
          </div>
        </template>
      </ConfirmPopup>
    </template>
  </Card>
</template>

<script setup>
import { Column } from 'primevue';
import { useProductsStore } from '~/stores/products'; 
import { useUsersStore } from '~/stores/users';
import { useConfirm } from "primevue/useconfirm";
import { useRoute, navigateTo } from '#app';
import { useAvatar } from '@/composables/useAvatar';


const { avatarUrl, loadAvatar } = useAvatar();

const productsStore = useProductsStore();
const usersStore = useUsersStore();
const confirm = useConfirm();
const route = useRoute();
const me = usersStore.me;

await productsStore.fetchProducts();
const products = computed(() => productsStore.products);

loadAvatar(usersStore.me?.avatar);

const checkRole = () => {
    return me?.role === 'superadmin' || me?.role === 'admin'
}

const deleteProduct = async (id) => {
  const result = await productsStore.deleteProduct(id);
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
            await deleteProduct(id);
        }
    });
}
const redirectToProductCreate = () => {
  navigateTo(`${route.path}/create`);
}
const editProduct = (id) => {
  navigateTo(`${route.path}/${id}`);
}
</script>