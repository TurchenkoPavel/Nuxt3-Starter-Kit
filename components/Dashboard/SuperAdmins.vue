<template>
  <DashboardUsersCard 
    :title="'Superadmins'" 
    :users="users"
    :percent="7"
  ></DashboardUsersCard>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore();

const users = computed(() => usersStore.superadminUsersCount);

</script>