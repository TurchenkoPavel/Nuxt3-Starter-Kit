<template>
  <DashboardUsersCard 
    :title="'Users'" 
    :users="users"
    :percent="12"
  ></DashboardUsersCard>
</template>

<script setup>
import { computed } from 'vue';
import { useUsersStore } from '~/stores/users';


const usersStore = useUsersStore();

const users = computed(() => usersStore.usersCount);

</script>