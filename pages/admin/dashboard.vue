<template>
  <h1 class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Admin dashboard</h1>
  <div class="flex justify-between gap-2">
    <DashboardUsers />  
    <DashboardAdmins />  
  </div>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore();

await usersStore.fetchUsers();
</script>