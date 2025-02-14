<template>
  <div class="flex justify-between gap-2">
    <h1 class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Sales</h1>
    <Button v-if="checkRole" label="Statuses" severity="help" @click="redirectToStatuses"/>
  </div>
  <div>
    <SalesTable />  
  </div>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore();

const me = usersStore.me;

const checkRole = () => {
    return me?.role === 'superadmin' || me?.role === 'admin'
}

const redirectToStatuses = () => {
  if (me?.role === 'superadmin') {
    navigateTo('/superadmin/sales/settings/statuses');
  }
  if (me?.role === 'admin') {
    navigateTo('/admin/sales/settings/statuses');
  }
};
</script>