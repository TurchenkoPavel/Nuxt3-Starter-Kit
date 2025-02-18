<template>
  <Card>
    <template #content>
      <div class="flex items-center gap-4 w-full mb-2">
        <Button icon="pi pi-arrow-left" severity="secondary" @click="$router.back()"></Button> 
        <h1 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">Edit Product</h1>
      </div>
      <Form 
        v-slot="$form" 
        :initialValues="initialValues" 
        :resolver="resolver"
        :validateOnValueUpdate="false" 
        :validateOnBlur="true" 
        autocomplete="off"
        autofill="off"
        class="flex flex-col gap-4 w-full w-56"
        @submit="onFormSubmit" 
      >
        <div class="flex flex-col gap-1">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText 
            id="name" 
            name="name"
            type="text"
            class="flex-auto" 
            autocomplete="off" />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
            {{ $form.name.error.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="description" class="font-semibold w-24">Description</label>  
          <Textarea 
            id="description" 
            name="description"
            rows="5" 
            class="flex-auto" 
            cols="30" 
          />
          <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
            {{ $form.description.error.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="price" class="font-semibold w-24">Price</label>
          <InputText 
            id="price" 
            name="price"
            type="text"
            class="flex-auto" 
            autocomplete="off" />
          <Message v-if="$form.price?.invalid" severity="error" size="small" variant="simple">
            {{ $form.price.error.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="quantity" class="font-semibold w-24">Quantity</label>
          <InputNumber 
            id="quantity" 
            name="quantity"
            type="number"
            class="flex-auto" 
          />
          <Message v-if="$form.quantity?.invalid" severity="error" size="small" variant="simple">
            {{ $form.quantity.error.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="currency" class="font-semibold w-24">Currency</label>
          <Select 
            name="currency" 
            :options="currency" 
            optionLabel="label"
            optionValue="value"
            placeholder="Select currency" 
            class="!w-[24rem] !sm:w-full" 
          />
          <Message v-if="$form.currency?.invalid" severity="error" size="small" variant="simple">
            {{ $form.currency.error.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="discount" class="font-semibold w-24">Discount</label>
          <InputNumber 
            id="discount" 
            name="discount"
            type="number"
            class="flex-auto" 
          />
          <Message v-if="$form.discount?.invalid" severity="error" size="small" variant="simple">
            {{ $form.discount.error.message }}
          </Message>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button type="submit" label="Save" severity="success"  icon="pi pi-check" />
        </div>
      </Form>
    </template>
  </Card>
</template>

<script setup>
import { useUsersStore } from '~/stores/users';
import { useProductsStore } from '~/stores/products';
import { useToast } from 'primevue/usetoast';
import { useRouter, useRoute } from '#app';

const usersStore = useUsersStore();
const productsStore = useProductsStore();
const toast = useToast();
const router = useRouter(); 
const route = useRoute();

const productId = route.params.id;
const me = usersStore.me;
const initialValues = ref({
  name: '',
  description: '',
  price: 0,
  quantity: 1,
  currency: '',
  discount: 0,
});
const currency = ref([
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'UAH', value: 'UAH' },
])

const product = await productsStore.fetchProductById(productId);

initialValues.value = product;

const resolver = ({ values }) => {
  const errors = {};  
  if (!values.name) errors.name = [{ message: 'Name is required.' }]; 
  if (!values.description) errors.description = [{ message: 'Description is required.' }];
  if (!values.price) errors.price = [{ message: 'Price is required.' }];
  if (!values.quantity) errors.quantity = [{ message: 'Quantity is required.' }];
  if (!values.currency) errors.currency = [{ message: 'Currency is required.' }];
  if (values.discount < 0) errors.discount = [{ message: 'Discount is required.' }]; 
  return { errors };  
};

const onFormSubmit = async({ valid, states }) => {
  if (valid) {
    states.editor_id = me.id
    const result = await productsStore.updateProduct(productId, states);
    if(result.success) {
      toast.add({ severity: 'success', summary: result.message, life: 3000 });
      router.back()
    } else {
      toast.add({ severity: 'error', summary: result.message, life: 3000 });
    }
  }
}
</script>