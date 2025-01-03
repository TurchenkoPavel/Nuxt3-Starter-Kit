export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const upworkApi = async (endpoint, options = {}) => {
    const headers = {
      Authorization: `Bearer ${config.upworkAccessToken}`,
      ...options.headers,
    };

    const response = await $fetch(`${config.upworkApiUrl}${endpoint}`, {
      ...options,
      headers,
    });

    return response;
  };

  return {
    provide: {
      upworkApi,
    },
  };
});
