<template>
  <section class="text-center py-10 bg-gray-700">
    <h2 class="section-title" id="hobbies">
      <a href="#hobbies"># {{ t('cv.hobbies') }}</a>
    </h2>
    <ul class="hobby-list">
      <li v-for="hobby in hobbies" :key="hobby.name" class="hobby-item">
        <span v-if="hobby.link">
          <a :href="hobby.link" target="_blank" class="text-blue-400 underline">{{ hobby.name }}</a>
        </span>
        <span v-else>{{ hobby.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import './Hobbies.scss';
import type { Hobby } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  hobbies: Hobby[];
}>();
</script>