<template>
  <section class="text-center py-10 bg-gray-700">
    <h2 class="section-title" id="education">
      <a href="#education"># Education</a>
    </h2>
    <div class="space-y-6">
      <div v-for="edu in educations" :key="edu.degree">
        <h3 class="education-degree heading-3">{{ edu.degree }}</h3>
        <div class="education-details">{{ edu.institution }} / {{ edu.location }} / {{ edu.period }}</div>
        <p v-if="edu.note">{{ edu.note }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import './Education.scss';
import type { Education as EducationType } from '~/types/cv';

const props = defineProps<{
  educations: EducationType[];
}>();
</script>