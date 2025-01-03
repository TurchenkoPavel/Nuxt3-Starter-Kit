<template>
  <div class="px-2 flex justify-center items-center h-[80vh]">
    <Card class="flex gap-2 justify-center border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded py-8 px-2 md:px-4 z-10 ">
      <template #title>
        <div class="text-black">Log in</div>
      </template>
      <template #subtitle>
        <div class="mt-[-0.5rem] text-sm font-medium mb-2">Please enter your details</div>
      </template>
      <template #content>
        <Form 
          v-slot="$form" 
          :initialValues="initialValues" 
          :resolver="resolver" 
          :validateOnValueUpdate="false" 
          :validateOnBlur="true"  
          @submit="onFormSubmit" 
          class="flex flex-col gap-4 w-full w-56"
        >
          <div class="flex flex-col gap-1">
            <InputText 
              name="email" 
              type="text" 
              placeholder="Email" 
              class="!text-xs !w-[20rem] !sm:w-full"
              fluid 
            />
            <Message 
              v-if="$form.email?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.email.error.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <InputText 
              name="password" 
              type="password" 
              placeholder="Password" 
              class="!text-xs !w-[20rem] !sm:w-full"
              fluid 
              :formControl="{ validateOnValueUpdate: true }" 
            />
            <Message 
              v-if="$form.password?.invalid" 
              severity="error" 
              size="small" 
              variant="simple"
            >
              {{ $form.password.error.message }}
            </Message>
          </div>
          <Button class="mt-2" type="submit" severity="contrast" label="Submit" />
        </Form>
      </template>
    </Card>
  </div>
  
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const initialValues = ref({
  email: '',
  password: ''
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.email) {
    errors.email = [{ message: 'Email is required.' }];
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required.' }];
  }

  return {
    errors
  };
};

const onFormSubmit = async ({ valid, states }) => {
  if (valid) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: states.email.value,
          password: states.password.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const result = await response.json();
      // Проверяем, успешно ли прошла авторизация
      if (result.success) {
        toast.add({ severity: 'success', summary: 'Login successful!', life: 3000 });
        // Сохраняем данные пользователя (например, токен)
        const user = useState('user'); // Если используете Pinia или Vuex, замените на подходящий store
        user.value = result.user;
        
        // Перенаправляем на нужную страницу
        if(user.value.role === 'superadmin') {
          navigateTo('/superadmin/dashboard');
        } else if(user.value.role === 'admin') {
          navigateTo('/admin/dashboard');
        } else  {
          navigateTo('/dashboard');
        }

        
      } else {
        toast.add({ severity: 'error', summary: 'Invalid login credentials', life: 3000 });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.add({ severity: 'error', summary: 'An error occurred during login.', life: 3000 });
    }  }
}
</script>
