<template>
   <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
    <template #empty> No sales found.</template>
  </DataTable>
</template>

<script setup>
import { useSalesStore } from '~/stores/sales';

const salesStore = useSalesStore();

const products = computed(() => salesStore.sales);

onMounted(async () => {
  await salesStore.fetchSales();
});

</script>