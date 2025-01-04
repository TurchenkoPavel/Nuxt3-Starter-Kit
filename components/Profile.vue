<template>
  <div class="flex gap-8 p-8 bg-white shadow-md m-8 rounded-xl">
    <!-- Left Sidebar -->
    <div class="w-1/4">
      <!-- Avatar Section -->
      <div class="flex flex-col items-center gap-4">
        <img src="~/assets/images/avatar.png" alt="" class="w-[120px] h-[120px] rounded">
        <div class="text-center">
          <h3 class="font-bold text-lg">Demo</h3>
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
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Privacy"
              icon="pi pi-shield"
              outlined
              :to="{ path: '/profile/privacy' }"
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Notifications"
              icon="pi pi-envelope"
              outlined
              :to="{ path: '/profile/notifications' }"
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="secondary"
              label="Web Notifications"
              icon="pi pi-bell"
              outlined
              :to="{ path: '/profile/web-notifications' }"
            />
          </li>
          <li>
            <Button
              class="w-full text-left"
              severity="danger"
              label="Delete Account"
              icon="pi pi-trash"
              outlined
              :to="{ path: '/profile/delete-account' }"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Content -->
    <div class="w-3/4 p-6">
      <slot />
    </div>
  </div>
</template>

<script setup>

</script>

