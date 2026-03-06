<!-- src/App.vue -->
<template>
  <div>
    <h1>Text Comparison Tool</h1>
    <TextInput @updateTexts="updateTexts" />
    <CompareButton :text1="text1" :text2="text2" @result="setResult" />
    <TextOutput :output="result" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from './components/TextInput.vue';
import CompareButton from './components/CompareButton.vue';
import TextOutput from './components/TextOutput.vue';

const text1 = ref('');
const text2 = ref('');
const result = ref('');

/**
 * Updates the values of text1 and text2 based on the payload object.
 * @param {Object} payload - Object containing the new values of text1 and text2.
 * @property {string} text1 - New value of text1.
 * @property {string} text2 - New value of text2.
 */
function updateTexts(payload) {
  text1.value = payload.text1;
  text2.value = payload.text2;
}

/**
 * Sets the value of the result variable to the given value.
 * @param {string} value - New value of the result variable.
 */
function setResult(value) {
  result.value = value;
}
</script>