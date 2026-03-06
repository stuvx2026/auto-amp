<!-- src/components/TextInput.vue -->
<template>
  <div>
    <input v-model="text1" placeholder="Enter first text" />
    <input v-model="text2" placeholder="Enter second text" />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const text1 = ref('');
const text2 = ref('');

const emit = defineEmits(['updateTexts']);

// Watch inputs and emit to parent
watch([text1, text2], () => {
  emit('updateTexts', { text1: text1.value, text2: text2.value });
});
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}
</style>