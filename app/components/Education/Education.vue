<template>
  <section class="text-center py-10 bg-gray-700">
    <h2 id="education" class="section-title">
      <a href="#education"># {{ t('cv.education') }}</a>
    </h2>
    <div class="space-y-6">
      <div v-for="edu in educations" :key="edu.degree[lang]" class="education-item">
        <h3 class="education-degree heading-3">{{ edu.degree[lang] }}</h3>
        <div class="education-details">{{ edu.institution[lang] }} / {{ edu.location }}</div>
        <p v-if="edu.note">{{ edu.note[lang] }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import './Education.scss';
import type { CVSupportedLangs, Education as EducationType } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  educations: EducationType[];
  lang: CVSupportedLangs;
}>();
</script>
