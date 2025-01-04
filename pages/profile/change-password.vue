<template>
  <Profile>
    <h2 class="text-2xl font-bold mb-6">Change password</h2>
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
