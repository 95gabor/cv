<template>
  <section class="text-center py-10 bg-gray-700">
    <h2 id="hobbies" class="section-title">
      <a href="#hobbies"># {{ t('cv.hobbies') }}</a>
    </h2>
    <ul class="hobby-list">
      <li v-for="hobby in hobbies" :key="hobby.name[lang]" class="hobby-item">
        <span v-if="hobby.link">
          <a :href="hobby.link" target="_blank" class="text-blue-400 underline">{{ hobby.name[lang] }}</a>
        </span>
        <span v-else>{{ hobby.name[lang] }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import './Hobbies.scss';
import type { CVSupportedLangs, Hobby } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  hobbies: Hobby[];
  lang: CVSupportedLangs;
}>();
</script>
