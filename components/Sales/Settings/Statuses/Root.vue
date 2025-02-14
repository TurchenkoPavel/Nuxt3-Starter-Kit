<template>
  <Card>
    <template #content>
      <div class="flex items-center gap-4 w-full mb-2">
        <Button icon="pi pi-arrow-left" severity="secondary" @click="$router.back()"></Button> 
        <h1 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">Sales statuses</h1>
        <SalesSettingsStatusesCreate class="ml-auto" />
      </div>
      <SalesSettingsStatusesView />
    </template>
  </Card>
</template>

<script setup></script>