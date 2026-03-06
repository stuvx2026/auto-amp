<!-- src/components/TextOutput.vue -->
<template>
  <textarea readonly :value="output" rows="5"></textarea>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  output: String
});
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>