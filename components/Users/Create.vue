<template>
  <div autocomplete="off" autofill="off" class="px-2 flex justify-center items-center h-[80vh]">
    <Card class="flex gap-2 justify-center border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded py-8 px-2 md:px-4 z-10">
      <template #title>
        <div class="text-black">Create User</div>
      </template>
      <template #subtitle>
        <div class="mt-[-0.5rem] text-sm font-medium mb-2">Please enter the user details</div>
      </template>
      <template #content>
        <Form 
          v-slot="$form" 
          :initialValues="initialValues" 
          :resolver="resolver" 
          :validateOnValueUpdate="false" 
          :validateOnBlur="true"  
          @submit="onFormSubmit" 
          class="flex flex-col gap-4 w-full w-56"
          autocomplete="off"
          autofill="off"
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
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email" 
              autocomplete="nope"
              autofill="nope"
              class="!w-[24rem] !sm:w-full"
              fluid 
              :readonly="isReadonly"
              @focus="removeReadonly"
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
            <Password 
              id="password"
              name="password" 
              placeholder="Password" 
              class="!w-[24rem] !sm:w-full"
              autocomplete="chrome-off"
              autofill="chrome-off"
              fluid 
              feedback
              toggleMask
              :readonly="isReadonly"
              @focus="removeReadonly"
            />
            <Message 
              v-if="$form.password?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.password.error.message }}
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
            <Button class="mt-2" severity="danger" label="Cancel" icon="pi pi-times" @click=" router.go(-1)" />
            <Button class="mt-2" type="submit" severity="success" label="Create User" icon="pi pi-check" />
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
import { useRouter } from 'vue-router';
const router = useRouter();


const toast = useToast();
const usersStore = useUsersStore();

const userMe = computed(() => usersStore.me);
const isReadonly = ref(true);

const initialValues = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
});

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

const resolver = ({ values }) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = [{ message: 'First Name is required.' }];
  }

  if (!values.lastName) {
    errors.lastName = [{ message: 'Last Name is required.' }];
  }

  if (!values.email) {
    errors.email = [{ message: 'Email is required.' }];
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required.' }];
  }

  if (!values.role) {
    errors.role = [{ message: 'Role is required.' }];
  }

  return {
    errors,
  };
};

const onFormSubmit = async ({ valid, states }) => {
  if (valid) {
    try {
      const response = await usersStore.createUser({
        firstName: states.firstName.value,
        lastName: states.lastName.value,
        email: states.email.value,
        password: states.password.value,
        role: states.role.value,
      });

      if (response.success) {
        toast.add({ severity: 'success', summary: 'User Created!', life: 3000 });
        navigateTo('/superadmin/users');
      } else {
        toast.add({ severity: 'error', summary: response.message, life: 3000 });
      }
    } catch (error) {
      console.log(error)
      toast.add({ severity: 'error', summary: 'Failed to create user.', life: 3000 });
    }
  }
};
const removeReadonly = () => {
  isReadonly.value = false;
}
</script>
