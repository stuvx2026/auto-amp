<!-- src/components/CompareButton.vue -->
<template>
  <button @click="compare">Compare Texts</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  text1: String,
  text2: String
});

const emit = defineEmits(['result']);

import { compareTexts } from './diffUtils.js';

function compare() {
  const result = compareTexts(props.text1, props.text2);
  emit('result', result);
}
</script>