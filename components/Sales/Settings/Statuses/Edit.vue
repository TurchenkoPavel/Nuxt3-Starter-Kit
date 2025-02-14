<template>
  <Dialog 
    v-model:visible="visible"
    modal 
    header="Edit Status" 
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <InputText v-model="name" id="name" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="closeDialog" />
      <Button type="button" label="Save" @click="editStatus" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from 'vue';

const props = defineProps({
  editVisible: Boolean,
  editStatusObject: Object
});

const emit = defineEmits(['update:editVisible', 'saveStatus']);

const visible = ref(props.editVisible);
const name = ref('');

// 🔥 Используем watchEffect, чтобы автоматически синхронизировать `visible`
watchEffect(() => {
  visible.value = props.editVisible;
});

// Следим за объектом и обновляем `name`
watchEffect(() => {
  name.value = props.editStatusObject?.name || '';
});

// Функция сохранения
const editStatus = () => {
  emit('saveStatus', { ...props.editStatusObject, name: name.value });
  closeDialog();
};

// Функция закрытия
const closeDialog = () => {
  emit('update:editVisible', false);
};
</script>
