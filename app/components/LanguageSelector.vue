<template>
  <div class="language-selector" data-testid="language-selector">
    <button
      type="button"
      class="language-toggle-button"
      data-testid="language-toggle"
      :aria-label="`Switch language to ${nextLanguage}`"
      @click="toggleLanguage"
    >
      {{ currentLanguage }}
    </button>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n();

const currentLanguage = computed(() => {
  return i18n.locale.value === 'en' ? 'EN' : 'HU';
});

const nextLanguage = computed(() => {
  return i18n.locale.value === 'en' ? 'HU' : 'EN';
});

const toggleLanguage = async () => {
  const nextLocale = i18n.locale.value === 'en' ? 'hu' : 'en';
  await i18n.setLocale(nextLocale);
  i18n.locale.value = nextLocale;
};
</script>

<style lang="scss">
.language-selector {
  @media print {
    display: none;
  }
}
</style>
