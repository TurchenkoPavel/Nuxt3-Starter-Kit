import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [], 
  }),
  actions: {
    async fetchProducts() {
      try {
        const data = await $fetch('/api/products');
        this.products = data || [];
      } catch (err) {
        console.error('Error fetching products:', err);
        this.error = err.message || 'An error occurred while fetching products.';
      }
    },
    async fetchProductById(id) {
      try {
        const data = await $fetch(`/api/products/${id}`);
        return data;
      } catch (err) {
        console.error('Error fetching product:', err);
        return null;
      }
    },
    async createProduct(productData) {
      console.log(productData)
      try {
        await $fetch('/api/products/create', {
          method: 'POST',
          body: productData,
        });
        await this.fetchProducts();
        return { success: true, message: 'Product created successfully' };
      } catch (err) {
        console.error('Error creating product:', err);
        return { success: false, message: err.message };
      }
    },
    async updateProduct(productId, productData) {
      try {
        await $fetch(`/api/products/${productId}`, {
          method: 'PUT',
          body: productData,
        });
        await this.fetchProducts();
        return { success: true, message: 'Product updated successfully' };
      } catch (err) {
        console.error('Error updating product:', err);
        return { success: false, message: err.message };
      }
    },
    async deleteProduct(productId) {
      try {
        await $fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        await this.fetchProducts();
        return { success: true, message: 'Product deleted successfully' };
      } catch (err) {
        console.error('Error deleting product:', err);
        return { success: false, message: err.message };
      }
    }
  }
})