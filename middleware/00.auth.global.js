export default defineNuxtRouteMiddleware(async (to, from) => {
  // Список публичных маршрутов
  const publicRoutes = ['/', '/login'];

  if (import.meta.server) {
    const __bs = useCookie('__bs')
    if(typeof __bs.value === 'string') {
      return;
    }
  } 

  try {
    const { authorized } = await $fetch('/api/auth/check');
    if (authorized) {
      to.meta.layout = 'authenticated'; // Use authenticated layout
      return;
    } else {
      if (publicRoutes.includes(to.path)) {
        to.meta.layout = 'public'; // Use public layout for public routes
        return; // Allow access to public route
      }
      return navigateTo('/login'); // Redirect to login for unauthorized users
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false; // Treat as unauthorized in case of error
  }

 
});