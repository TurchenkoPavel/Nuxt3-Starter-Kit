import { defineStore } from "pinia";

export const useStatusesStore = defineStore("statuses", {
  state: () => ({
    statuses: [],
  }),
  actions: {
    async fetchStatuses() {
      try {
        const data = await $fetch("/api/sales/settings/statuses");
        this.statuses = data || [];
      } catch (err) {
        console.error("Error fetching statuses:", err);
        this.error = err.message || "An error occurred while fetching statuses.";
      }
    },

    async createStatus(statusData) {
      try {
        await $fetch("/api/sales/settings/statuses/create", {
          method: "POST",
          body: statusData,
        });
        await this.fetchStatuses();
        return { success: true, message: "Status created successfully" };
      } catch (err) {
        console.error("Error creating status:", err);
        return { success: false, message: err.message };
      }
    },

    async updateStatus(statusId, statusData) {
      try {
        await $fetch(`/api/sales/settings/statuses/${statusId}`, {
          method: "PUT",
          body: statusData,
        });
        await this.fetchStatuses();
        return { success: true, message: "Status updated successfully" };
      } catch (err) {
        console.error("Error updating status:", err);
        return { success: false, message: err.message };
      }
    },

    async deleteStatus(statusId) {
      try {
        await $fetch(`/api/sales/settings/statuses/${statusId}`, {
          method: "DELETE",
        });
        await this.fetchStatuses();
        return { success: true, message: "Status deleted successfully" };
      } catch (err) {
        console.error("Error deleting status:", err);
        return { success: false, message: err.message };
      }
    },
  },
});