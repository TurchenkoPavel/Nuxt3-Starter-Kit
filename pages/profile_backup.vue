<template>
  <div class="flex gap-8 p-8 bg-white shadow-md m-8 rounded-xl">
    <!-- Left Sidebar -->
    <div class="w-1/4">
      <!-- Avatar Section -->
      <div class="flex flex-col items-center gap-4">
        <img src="~/assets/images/avatar.png" alt="" class="w-[120px] h-[120px] rounded">
        <div class="text-center">
          <h3 class="font-bold text-lg">Demo</h3>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="mt-6">
        <ul class="flex flex-col gap-2">
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Account"
              icon="pi pi-user"
              outlined
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Change Password"
              icon="pi pi-lock"
              outlined
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Privacy"
              icon="pi pi-shield"
              outlined
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Notifications"
              icon="pi pi-envelope"
              outlined
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Web Notifications"
              icon="pi pi-bell"
              outlined
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="danger"
              label="Delete Account"
              icon="pi pi-trash"
              outlined
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Content -->
    <div class="w-3/4 p-6 ">
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
    </div>
  </div>
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

<style>
/* Add your custom styles here if needed */
</style>
