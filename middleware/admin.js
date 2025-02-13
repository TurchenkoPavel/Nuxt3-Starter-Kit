import  { useUsersStore } from '~/stores/users'

export default defineNuxtRouteMiddleware(async (to) => {
  const usersStore = useUsersStore();

  // Загружаем данные о пользователе
  if (!usersStore.me) {
    await usersStore.fetchUserData();
  }

  // Проверяем роль superadmin
  if (usersStore.me?.role !== 'admin') {
    return navigateTo('/');
  }
});