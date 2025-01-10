<template>
  <Profile>
    <h2 class="text-2xl font-bold mb-6">Account</h2>
    <Form v-model:initialValues="initialValues" 
      v-slot="$form" 
      :resolver="resolver" 
      :validateOnValueUpdate="false" 
      :validateOnBlur="true"  
      @submit="onFormSubmit" 
      class="flex flex-col gap-4 w-full w-56"
    >
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <InputText 
            name="firstName" 
            type="text" 
            placeholder="First Name" 
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
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <InputText 
            name="lastName" 
            type="text" 
            placeholder="Last Name" 
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
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <InputText 
            name="email" 
            type="email" 
            placeholder="Email" 
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
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">
            Role
          </label>
          <Select 
            name="role" 
            :options="roles" 
            optionLabel="label"
            optionValue="value"
            placeholder="Select Role" 
            class="w-full" 
            disabled
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
      </div>
      <Button
        label="Update Account"
        type="submit"
        class="mt-6"
        severity="success"
        icon="pi pi-check"
      />
    </Form>
  </Profile>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useUsersStore } from '~/stores/users';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const usersStore = useUsersStore();
const route = useRoute();
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
  if(userMe !== null) {
    initialValues.value.firstName = userMe.value.firstName
    initialValues.value.lastName = userMe.value.lastName
    initialValues.value.email = userMe.value.email
    initialValues.value.role = userMe.value.role
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
      await usersStore.updateUser(userMe.value.id, states);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully.', life: 3000 });
      await usersStore.fetchUserData();
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user.', life: 3000 });
    }
  }
};
</script>
