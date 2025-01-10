import { ref } from 'vue';

export function useAvatar(defaultAvatar = '/images/avatar.png') {
  const avatarUrl = ref(defaultAvatar);

  function loadAvatar(userAvatar) {
    if (userAvatar) {
      const img = new Image();
      img.onload = () => {
        avatarUrl.value = userAvatar; // File exists, use it
      };
      img.onerror = () => {
        console.warn('Avatar file does not exist, using default.');
        avatarUrl.value = defaultAvatar; // Fallback to default avatar
      };
      img.src = userAvatar; // Try loading the image
    } else {
      avatarUrl.value = defaultAvatar; // Fallback to default avatar
    }
  }

  return { avatarUrl, loadAvatar };
}
