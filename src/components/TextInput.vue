<!-- src/components/TextInput.vue -->
<template>
  <div class="text-input-container">
    <textarea class="text-input first-input area" v-model="text1" placeholder="Voer eerste tekst in"></textarea>
    <textarea class="text-input second-input area" v-model="text2" placeholder="Voer tweede tekst in"></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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