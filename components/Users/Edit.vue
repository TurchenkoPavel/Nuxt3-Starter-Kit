<template>
  <div class="px-2 flex justify-center items-center h-[80vh]">
    <Card class="flex gap-2 justify-center border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded py-8 px-2 md:px-4 z-10">
      <template #title>
        <div class="text-black">Edit User</div>
      </template>
      <template #subtitle>
        <div class="mt-[-0.5rem] text-sm font-medium mb-2">Edit user details</div>
      </template>
      <template #content>
        <!-- eslint-disable-next-line vue/no-v-model-argument -->
        <Form v-model:initialValues="initialValues" 
          v-slot="$form" 
          :resolver="resolver" 
          :validateOnValueUpdate="false" 
          :validateOnBlur="true"  
          @submit="onFormSubmit" 
          class="flex flex-col gap-4 w-full w-56"
        >
          <div class="flex flex-col gap-1">
            <InputText 
              name="firstName" 
              type="text" 
              placeholder="First Name" 
              class="!w-[24rem] !sm:w-full"
              fluid 
            />
            <Message 
              v-if="$form.firstName?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.firstName.error.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <InputText 
              name="lastName" 
              type="text" 
              placeholder="Last Name" 
              class="!w-[24rem] !sm:w-full"
              fluid 
            />
            <Message 
              v-if="$form.lastName?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.lastName.error.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <InputText 
              name="email" 
              type="email" 
              placeholder="Email" 
              class="!w-[24rem] !sm:w-full"
              fluid 
            />
            <Message 
              v-if="$form.email?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.email.error.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <Select 
              name="role" 
              :options="roles" 
              optionLabel="label"
              optionValue="value"
              placeholder="Select Role" 
              class="!w-[24rem] !sm:w-full" 
            />
            <Message 
              v-if="$form.role?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.role.error.message }}
            </Message>
          </div>
          <div class="grid grid-flow-col gap-2 w-full justify-stretch">
            <Button class="mt-2" severity="danger" label="Cancel" icon="pi pi-check" @click="router.go(-1)" />
            <Button class="mt-2" type="submit" severity="success" label="Update User" icon="pi pi-check" />
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useUsersStore } from '~/stores/users';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const usersStore = useUsersStore();
const route = useRoute();
const router = useRouter();
const userMe = computed(() => usersStore.me);

const roles = computed(() => {
  const baseRoles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  if (userMe.value?.role === 'superadmin') {
    baseRoles.unshift({ label: 'Super Admin', value: 'superadmin' });
  }

  return baseRoles;
});

const initialValues = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
});

if(import.meta.client) {
  try {
    const userId = route.params.id;
    const user = await usersStore.fetchUser(userId);
    if(user !== null) {
      initialValues.value.firstName = user.firstName
      initialValues.value.lastName = user.lastName
      initialValues.value.email = user.email
      initialValues.value.role = user.role
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user data.', life: 3000 });
  }
}

const resolver = ({ values }) => {
  const errors = {};
  if (!values.firstName) errors.firstName = [{ message: 'First Name is required.' }];
  if (!values.lastName) errors.lastName = [{ message: 'Last Name is required.' }];
  if (!values.email) errors.email = [{ message: 'Email is required.' }];
  if (!values.role) errors.role = [{ message: 'Role is required.' }];
  return { errors };
};

const onFormSubmit = async ({ valid, states }) => {
  if (valid) {
    try {
      await usersStore.updateUser(route.params.id, states);
      toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully.', life: 3000 });
      navigateTo('/superadmin/users');
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user.', life: 3000 });
    }
  }
};
</script>
