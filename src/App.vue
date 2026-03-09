<template>
  <div class="container">
    <h1 class="heading">AUTO AMP</h1>
    <!-- Help dropdown -->
    <div class="help-container">
      <button class="button help-button" @click="showHelp = !showHelp">
        {{ showHelp ? 'Verberg uitleg' : 'Toon uitleg' }}
      </button>

      <div v-if="showHelp" class="help-text">
        <p>
          Welkom bij <strong>AUTO AMP</strong>! Deze tool helpt je verschillen
          tussen twee teksten te vergelijken en automatisch om te zetten in
          AMPscript voor Salesforce Marketing Cloud (SFMC).
        </p>
        <ol>
          <li>
            <strong>Vul de teksten in:</strong> Er zijn twee hoofdvelden: eerste
            tekst (origineel) en tweede tekst (nieuw of aangepast). De tool
            vergelijkt deze karakter voor karakter.
          </li>
          <li>
            <strong>AMPscript-voorwaarde instellen:</strong> Voer een voorwaarde
            in zoals <code>@OLD = true</code> of <code>@AGE > 60</code>. De
            verschillen worden in een IF...ELSE...ENDIF blok gezet.
          </li>
          <li>
            <strong>(Optioneel) Derde input:</strong> Vink "Add third input"
            aan om een extra tekstveld te gebruiken met een eigen voorwaarde.
          </li>
          <li>
            <strong>Compare klikken:</strong> De tool genereert SFMC AMPscript
            in het uitvoerveld.
          </li>
          <li>
            <strong>Kopiëren:</strong> Klik op "Copy" om de AMPscript te
            kopiëren naar je klembord.
          </li>
          <li>
            <strong>Start opnieuw:</strong> Klik op "Clear" om alle velden te
            legen en opnieuw te beginnen.
          </li>
        </ol>
      </div>
    </div>

    <!-- Text inputs -->
    <TextInput @updateTexts="updateTexts" class="mb-5" />

    <!-- AMPscript condition -->
    <div class="mb-5">
      <label class="cond-label" for="condition">AMPscript Condition:</label>
      <input
        id="condition"
        v-model="condition"
        placeholder="@OLD = true"
        class="text-input"
      />
    </div>

    <!-- Checkbox -->
    <div class="checkbox-label mb-5 cond-label">
      Voeg taal toe! 
      <input class="checkbox" type="checkbox" v-model="addThirdInput" />
    </div>

    <!-- Third input fields -->
    <div v-if="addThirdInput" class="mb-5">
      <input
        v-model="thirdInput"
        placeholder="Enter third input"
        class="text-input"
      />
      <input
        v-model="thirdCondition"
        placeholder="Condition for third input"
        class="text-input mt-5"
      />
    </div>

    <!-- Buttons -->
    <div class="mb-5">
      <CompareButton 
        :text1="text1" 
        :text2="text2" 
        :condition="condition"
        :third-input="addThirdInput ? thirdInput : null"
        :third-condition="addThirdInput ? thirdCondition : null"
        @result="setResult"
        class="button"
      />
      <button @click="clearAll" class="button" style="margin-left:10px;">Clear</button>
    </div>

    <!-- Output and Copy -->
    <div class="output-container" style="position: relative;">
      <TextOutput :output="sfmcOutput" ref="outputRef" class="output" />
      <CopyButton :output="sfmcOutput" @copy="copyToClipboard" />

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TextInput from "./components/TextInput.vue";
import CompareButton from "./components/CompareButton.vue";
import TextOutput from "./components/TextOutput.vue";
import CopyButton from "./components/CopyButton.vue";


const text1 = ref("");
const text2 = ref("");
const result = ref("");
const condition = ref("@OLD = true");
const showHelp = ref(false) // ← reactive property for dropdown

// Third input state
const addThirdInput = ref(false);
const thirdInput = ref("");
const thirdCondition = ref('@language = "F"');

const sfmcOutput = ref("");
const outputRef = ref(null);

/**
 * Update the text1 and text2 values with the provided payload.
 */
function updateTexts(payload) {
  text1.value = payload.text1;
  text2.value = payload.text2;
}

/**
 * Set the result of the comparison.
 * This result is already SFMC-ready from diffWords
 */
function setResult(value) {
  result.value = value;
}

/*************  ✨ Windsurf Command 🌟  *************/
/**
 * Clear all text inputs and output.
 */
function clearAll() {
  try {
    if (text1.value !== null) text1.value = '';
    if (text2.value !== null) text2.value = '';
    if (result.value !== null) result.value = '';
    if (sfmcOutput.value !== null) sfmcOutput.value = '';
    if (condition.value !== null) condition.value = '@OLD = true';
  text1.value = ''
  text2.value = ''
  result.value = ''
  sfmcOutput.value = ''
  condition.value = '@OLD = true'

    // Reset third input and checkbox
    if (addThirdInput.value !== null) addThirdInput.value = false;
    if (thirdInput.value !== null) thirdInput.value = '';
    if (thirdCondition.value !== null) thirdCondition.value = '@language = "F"';
  } catch (error) {
    console.error('Error clearing all text inputs and output: ', error);
  }
  // Reset third input and checkbox
  addThirdInput.value = false
  thirdInput.value = ''
  thirdCondition.value = '@language = "F"'
}
/*******  a032c53d-5074-45d4-ae48-df8c32fa88d9  *******/  

/**
 * Copy the SFMC output to the clipboard.
 * @returns {Promise<void>}
 */
function copyToClipboard() {
  /**
   * Check if the SFMC output is empty before attempting to copy.
   * If it is empty, return and do not attempt to copy.
   */
  if (!sfmcOutput.value) return;
  
  /**
   * Attempt to copy the SFMC output to the clipboard.
   * If the copy is successful, alert the user with a success message.
   * If the copy fails, alert the user with an error message.
   */
  navigator.clipboard
    .writeText(sfmcOutput.value)
    .then(() => alert("Copied to clipboard!"))
    .catch((err) => alert("Failed to copy: " + err));
}

/**
 * Watch the result and wrap it with third input if enabled
 */
watch(result, (newVal) => {
  sfmcOutput.value = newVal
})
</script>


