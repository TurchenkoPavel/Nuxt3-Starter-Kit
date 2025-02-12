export default defineNuxtRouteMiddleware(async (to) => {
  const usersStore = useUsersStore();

  // Загружаем данные о пользователе
  if (!usersStore.me) {
    await usersStore.fetchUserData();
  }

  console.log(usersStore.me?.role)
  // Проверяем роль superadmin
  if (usersStore.me?.role !== 'admin') {
    return navigateTo('/');
  }
});