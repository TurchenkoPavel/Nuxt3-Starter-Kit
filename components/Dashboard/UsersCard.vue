<template>
  <Card class="w-full">
    <template #content>
    <span class="font-semibold text-lg">{{ title }}</span>
    <div class="flex justify-between items-start mt-4">
      <div class="w-6/12">
        <span class="text-4xl font-bold text-surface-900 dark:text-surface-0">
          {{ users }}
        </span>
        <div class="text-green-500">
          <span class="font-medium">+{{ percent }}%</span>
          <i class="pi pi-arrow-up text-xs ml-2"></i>
        </div>
      </div>
      <div class="w-6/12">
        <svg width="100%" viewBox="0 0 258 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 93.9506L4.5641 94.3162C8.12821 94.6817 15.2564 95.4128 22.3846 89.6451C29.5128 83.8774 36.641 71.6109 43.7692 64.4063C50.8974 57.2018 58.0256 55.0592 65.1538 58.9268C72.2821 62.7945 79.4103 72.6725 86.5385 73.5441C93.6667 74.4157 100.795 66.2809 107.923 65.9287C115.051 65.5765 122.179 73.0068 129.308 66.8232C136.436 60.6396 143.564 40.8422 150.692 27.9257C157.821 15.0093 164.949 8.97393 172.077 6.43766C179.205 3.9014 186.333 4.86425 193.462 12.0629C200.59 19.2616 207.718 32.696 214.846 31.0487C221.974 29.4014 229.103 12.6723 236.231 5.64525C243.359 -1.38178 250.487 1.29325 254.051 2.63076L257.615 3.96827" style="stroke-width:2px;stroke:#10b981;" stroke="10"></path>
        </svg>
      </div>
    </div>
    </template>
  </Card>
</template>

<script setup>
defineProps({
  title: String,
  users: Number,
  percent: Number
})

</script>