<template>
  <section class="text-center py-10">
    <h2 id="skills" class="section-title">
      <a href="#skills"># {{ t('cv.skills') }}</a>
    </h2>
    <div class="grid grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
      <ul class="space-y-2" role="list" itemscope itemtype="https://schema.org/ItemList">
        <li
          v-for="(skill, index) in skills"
          :key="skill[lang]"
          role="listitem"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="name">{{ skill[lang] }}</span>
          <meta itemprop="position" :content="index + 1" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import './Skills.scss';
import type { CVSupportedLangs, Skill } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  skills: Skill[];
  lang: CVSupportedLangs;
}>();
</script>
