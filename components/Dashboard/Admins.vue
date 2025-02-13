<template>
  <DashboardUsersCard 
    :title="'Users'" 
    :users="users"
  ></DashboardUsersCard>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore();

const users = computed(() => usersStore.adminUsersCount);
</script>