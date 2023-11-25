<script setup lang="ts"/>
<!-- Language switcher -->
<template>
  <div class="language-switch">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "language-switch",
  data() {
    return {
      langs: [
        { code: "en", text: "English" },
        { code: "nb", text: "Norsk" },
      ],
    };
  },
};
</script>