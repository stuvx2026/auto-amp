<template>
  <button @click="copyToClipboard" class="copy-button" v-if="output">Copy</button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  output: String,
});

const emit = defineEmits(['copy']);

function copyToClipboard() {
  console.log('copyToClipboard called'); // Log statement
  emit('copy');
}

console.log('output:', props.output); // Log statement
</script>

<style scoped>
.copy-button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.copy-button:hover {
  background-color: #0056b3;
}
</style>