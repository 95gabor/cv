<template>
  <div class="language-selector">
    <button
      @click="toggleLanguage"
    >
      {{ currentLanguage }}
    </button>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()

const currentLanguage = computed(() => {
  return i18n.locale.value === 'en' ? 'EN' : 'HU'
})

const toggleLanguage = () => {
  i18n.setLocale(i18n.locale.value === 'en' ? 'hu' : 'en')
}
</script>

<style lang="scss">
.language-selector {
  @media print {
    display: none;
  }
}
</style>
