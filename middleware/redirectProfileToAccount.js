export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/profile') {
    return navigateTo('/profile/account');
  }
});