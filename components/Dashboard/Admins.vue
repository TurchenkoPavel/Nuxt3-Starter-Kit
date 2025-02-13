<template>
  <DashboardUsersCard 
    :title="'Admins'" 
    :users="users"
    :percent="5"
  ></DashboardUsersCard>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore();

const users = computed(() => usersStore.adminUsersCount);
</script>