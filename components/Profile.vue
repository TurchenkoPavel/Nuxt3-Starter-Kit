<template>
  <div class="flex gap-8 p-8 bg-white shadow-md m-8 rounded-xl">
    <!-- Left Sidebar -->
    <div class="w-1/4">
      <!-- Avatar Section -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-[120px] h-[120px] rounded-full overflow-hidden !relative">
          <img :src="avatarUrl" alt="" class="w-[120px] h-[120px] rounded">
          <Button
            unstyled
            :pt="{
              root: 'text-left absolute bottom-0 w-[120px] h-10 bg-green-500 bg-opacity-50 flex items-center justify-center hover:bg-opacity-100 transition duration-300',
            }"
            @click="showUploadPopup = true"
          >
            <i class="pi pi-camera text-white"></i> <!-- Manually add the PrimeIcons class -->
          </Button>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="mt-6">
        <ul class="flex flex-col gap-2">
          <li>
            <NuxtLink :to="{ path: '/profile/account' }" class="w-full">
              <Button
                class="w-full text-left"
                severity="secondary"
                label="Account"
                icon="pi pi-user"
                outlined
              />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/profile/change-password' }" class="w-full">
              <Button
                class="w-full text-left"
                severity="secondary"
                label="Change Password"
                icon="pi pi-lock"
                outlined
              />         
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/profile/privacy' }" class="w-full">
              <Button
                class="w-full text-left"
                severity="secondary"
                label="Privacy"
                icon="pi pi-shield"
                outlined
              />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/profile/notifications' }" class="w-full">
              <Button
                class="w-full text-left"
                severity="secondary"
                label="Notifications"
                icon="pi pi-envelope"
                outlined
              />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/profile/web-notifications' }" class="w-full">
              <Button
                class="w-full text-left"
                severity="secondary"
                label="Web Notifications"
                icon="pi pi-bell"
                outlined
              />
            </NuxtLink>
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="danger"
              label="Delete Account"
              icon="pi pi-trash"
              outlined
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Content -->
    <div class="w-3/4 p-6">
      <slot />
    </div>
    <Dialog
      v-model:visible="showUploadPopup"
      header="Upload New Avatar"
      :modal="true"
      :closable="true"
      class="w-[800px]"
    >
        <FileUpload 
          name="avatar" 
          url="/api/upload" 
          @upload="onTemplatedUpload($event)" 
          :multiple="false" 
          accept="image/*" 
          :maxFileSize="1000000" 
          @select="onSelectedFiles">
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                    <div class="flex gap-2">
                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary"></Button>
                        <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                    </div>
                    <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                        <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                    </ProgressBar>
                </div>
            </template>
            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                <div class="flex flex-col gap-8 pt-4">
                    <div v-if="files.length > 0">
                        <h5>Pending</h5>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Badge value="Pending" severity="warn" />
                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                            </div>
                        </div>
                    </div>

                    <div v-if="uploadedFiles.length > 0">
                        <h5>Completed</h5>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Badge value="Completed" class="mt-4" severity="success" />
                                <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex items-center justify-center flex-col">
                    <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                    <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>
    </Dialog>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useToast } from "primevue/usetoast";
import { usePrimeVue } from 'primevue/config';
import { useAvatar } from '@/composables/useAvatar';

const { avatarUrl, loadAvatar } = useAvatar();

const $primevue = usePrimeVue();
const toast = useToast();
const usersStore = useUsersStore();
const showUploadPopup = ref(false)

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

loadAvatar(usersStore.me?.avatar);

if (usersStore.me?.avatar) {
  const img = new Image();
  img.onload = () => {
    avatarUrl.value = usersStore.me.avatar; // File exists, use it
  };
  img.onerror = () => {
    console.warn('Avatar file does not exist, using default.');
  };
  img.src = usersStore.me.avatar; // Try loading the image
}

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

const uploadEvent = async () => {
  if(files.value.length > 0) {
    const formData = new FormData();
    formData.append('avatar', files.value[0]);
    formData.append('userId', usersStore.me.id);

      try {
      const response = await $fetch('/api/users/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.success) {
        console.error('Upload failed: ');
        return;
      }

      avatarUrl.value = response.filePath;
      usersStore.me.avatar = response.filePath;
      toast.add({ severity: 'success', summary: 'Success', detail: 'Avatar Uploaded', life: 3000 });
      showUploadPopup.value = false;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Avatar was not Uploaded', life: 3000 });
    }
  }
};

</script>

