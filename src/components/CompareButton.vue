<!-- src/components/CompareButton.vue -->
<template>
  <button @click="handleCompare" style="padding:10px 20px;">Amp it!</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { compareTexts } from '../components/diffUtils.js'

const props = defineProps({
  text1: String,
  text2: String,
  condition: String,
  thirdInput: { type: String, default: null },
  thirdCondition: { type: String, default: null },
})

const emit = defineEmits(['result'])

/**
 * Compare two texts based on a condition and optionally wrap the result with a third input and condition.
 * Emits the result as a string.
 * @example
 * handleCompare('old text', 'new text', '@ OLD = true');
 * // Emits 'old text'
 * handleCompare('old text', 'new text', '@OLD = true', 'third input', '@language = "F"');
 * // Emits '%%[IF @language = "F" THEN]third input%%[ELSE]old text%%[ENDIF]%%'
 */
function handleCompare() {
  // Compare the first two texts
  let output = compareTexts(props.text1, props.text2, props.condition)

  // Wrap with third input condition only if provided
  if (props.thirdInput && props.thirdCondition) {
    output = `%%[IF ${props.thirdCondition} THEN]${props.thirdInput}%%[ELSE]${output}%%[ENDIF]%%`
  }

  emit('result', output)
}
</script>

<style scoped>
button {
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 16px;
  cursor: pointer;
}
</style>