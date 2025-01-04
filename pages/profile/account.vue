<template>
  <Profile>
    <h2 class="text-2xl font-bold mb-6">Account</h2>
    <div class="grid grid-cols-1 gap-6">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <InputText id="firstName" v-model="formData.firstName" class="w-full" />
      </div>
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <InputText id="lastName" v-model="formData.lastName" class="w-full" />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <InputText id="email" v-model="formData.email" class="w-full" />
      </div>
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700">
          Role
        </label>
        <InputText id="role" v-model="formData.role" class="w-full" readonly />
      </div>
    </div>
    <Button
      label="Update Account"
      class="mt-6"
      severity="success"
      icon="pi pi-check"
    />
  </Profile>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  firstName: "John",
  lastName: "Doe",
  email: "demo@example.com",
  role: "Admin",
});
</script>
