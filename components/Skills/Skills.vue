<template>
  <section class="text-center py-10">
    <h2 class="section-title" id="skills">
      <a href="#skills"># Skills</a>
    </h2>
    <div class="grid grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
      <ul class="space-y-2">
        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import './Skills.scss';
import type { Skill } from '~/types/cv';

defineProps<{
  skills: Skill[];
}>();
</script>