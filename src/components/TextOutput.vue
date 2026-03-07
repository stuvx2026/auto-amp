<!-- src/components/TextOutput.vue -->
<template>
  <textarea class="text-output" readonly :value="output" rows="5"></textarea>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  output: String
});
</script>
