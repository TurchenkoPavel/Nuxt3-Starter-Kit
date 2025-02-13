import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    me: null,
    users: [],
  }),
  getters: {
    usersCount: (state) => state.users.filter((user) => user.role === 'user').length,
    adminUsersCount: (state) => state.users.filter((user) => user.role === 'admin').length,
    superadminUsersCount: (state) => state.users.filter((user) => user.role === 'superadmin').length,
  },
  actions: {
    async fetchUserData() {
      try {
        const { data } = await useFetch('/api/users/me');
        if(data.value) {
          this.me = data.value
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    },
    async fetchUser(id) {
      try {
        return await $fetch(`/api/users/${id}`);
      } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err; // Re-throw error for handling in the component
      }
    },
    async fetchUsers() {
      try {
        const data = await $fetch('/api/users');
        this.users = data || [];
      } catch (err) {
        console.error('Error fetching users:', err);
        this.error = err.message || 'An error occurred while fetching users.';
      } 
    },
    async createUser(userData) {
      try {
        const { error  } = await useFetch('/api/users/create', {
          method: 'POST',
          body: userData,
        });

        if (error.value) {
          return { success: false, message: error?.value?.data?.message || 'Failed to create user' };
        }
    
        // Optionally re-fetch the users list
        await this.fetchUsers();
    
        // Return a simplified success object
        return { success: true, message: 'User created successfully' };
      } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: error.message };
      }
    },
    async updateUser(id, updatedUserData) {
      try {
        const { error } = await useFetch(`/api/users/${id}`, {
          method: 'PUT',
          body: updatedUserData,
        });

        if (error.value) {
          return { success: false, message: error?.value?.data?.message || 'Failed to create user' };
        }

        // Optionally re-fetch the users list
        await this.fetchUsers();

        return { success: true, message: 'User updated successfully' };
      } catch (err) {
        console.error('Error updating user:', err);
        throw err;
      }
    },
    async deleteUser(userId) {
      try {
        // Send the DELETE request to the server
        const { error } = await useFetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (error.value) {
          return { success: false, message: error?.value?.data?.message || 'Failed to delete user' };
        }

        // Optionally, refresh the users list after deletion
        await this.fetchUsers();
    
        return { success: true, message: 'User deleted successfully' };
      } catch (err) {
        console.error('Error deleting user:', err.message);
        return { success: false, message: err.message };
      }
    }
  },
});