<template>
  <div class="flex justify-between items-center p-4 text-white bg-white shadow-md fixed w-full z-30	 top-0">
    <div v-if="isLoggedIn" >
      <Button severity="contrast" icon="pi pi-bars" @click="isSidebarVisible = !isSidebarVisible" />
      
    </div>
    <div>
      <!-- <img src="/logo.png" alt="Logo" class="logo" /> -->
       <NuxtLink :to="'/'" class="font-bold text-black" external>LOGO</NuxtLink>
    </div>
    <div class="flex flex-wrap place-content-center gap-3">
    <NuxtLink 
      v-if="isLoggedIn" 
      to="/profile" 
      class="h-auto flex items-center cursor-pointer px-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple" 
      external
    >
      <Avatar :image="avatarUrl" shape="circle" />
      <span class="font-bold text-black">{{ usersStore.me?.firstName }} {{ usersStore.me?.lastName }}</span>
      </NuxtLink>
      
      <!-- Login Button -->
      <Button 
        v-if="!isLoggedIn" 
        label="Login" 
        severity="contrast" 
        icon="pi pi-sign-in" 
        class="my-auto h-auto" 
        @click="login" 
      />
      
      <!-- Logout Button -->
      <Button 
        v-else 
        label="Logout" 
        severity="contrast" 
        icon="pi pi-sign-out" 
        class="my-auto h-auto" 
        @click="logout" 
      />
    </div>

  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { useUsersStore } from '~/stores/users';
import { useToast } from 'primevue/usetoast';
import { useAvatar } from '@/composables/useAvatar';

const { avatarUrl, loadAvatar } = useAvatar();

const toast = useToast();
const router = useRouter();
const isLoggedIn = ref(false)
const usersStore = useUsersStore(); // Initialize the store
loadAvatar(usersStore.me?.avatar);

const isSidebarVisible = useState('isSidebarVisible', () => false);

// Check login status
const checkAuthStatus = async () => {
  try {
    const response = await $fetch('/api/auth/check');
    isLoggedIn.value = response.authorized; // Update the login state based on the response
  } catch (error) {
    console.error('Error checking auth status:', error);
    isLoggedIn.value = false; // Default to not logged in on error
  }
};

const logout = async () => {
  try {
    const response = await $fetch('/api/auth/logout', { method: 'POST' });
    
    // Check if the server responded with success
    if (response.success) {
      isLoggedIn.value = false; // Update state
      usersStore.me = null;
      router.push('/login'); // Redirect to login page
      toast.add({
        severity: 'success',
        summary: 'Logout Successful',
        detail: 'You have been logged out.',
        life: 3000,
      });
    } else {
      console.error('Logout failed on server:', response.message || 'Unknown error');
      toast.add({
        severity: 'error',
        summary: 'Logout Failed',
        detail: response.message || 'Please try again.',
        life: 3000,
      });
    }
  } catch (error) {
    console.error('Logout request failed:', error);
  }
};

const login = () => {
  router.push('/login');
};

onMounted(() => {
  checkAuthStatus();
});
</script>

<style scoped>
</style>
