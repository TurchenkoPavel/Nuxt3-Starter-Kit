export default defineEventHandler((event) => {
  // Clear the cookie
  deleteCookie(event, '__bs');

  return {
    success: true,
    message: 'Logout successful',
  };
});
