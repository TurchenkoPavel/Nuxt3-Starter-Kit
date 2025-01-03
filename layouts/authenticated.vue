<template>
  <div class="min-h-[100vh] pt-[78px]">
    <Header></Header>
    <CustomSidebar></CustomSidebar> 
    <slot></slot>
  </div>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore(); // Initialize the store

if(import.meta.client) {
  if (!usersStore.me) {
    await usersStore.fetchUserData();
  }
}
</script>