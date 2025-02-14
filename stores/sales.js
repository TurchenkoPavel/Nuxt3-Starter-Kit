import { defineStore } from "pinia";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    sales: [],
  }),
  getters: {},
  actions: {
    async fetchSales() {
      try {
        const data = await $fetch("/api/sales");
        this.sales = data || [];
      } catch (err) {
        console.error("Error fetching sales:", err);
        this.error = err.message || "An error occurred while fetching sales.";
      }
    }
  },
});