<template>
  <section class="text-center py-10" data-testid="skills-section">
    <h2 id="skills" class="section-title">
      <a href="#skills"># {{ t('cv.skills') }}</a>
    </h2>
    <div
      class="grid grid-cols-2 gap-6 text-left max-w-4xl mx-auto"
      data-testid="skills-grid"
    >
      <ul
        class="space-y-2"
        role="list"
        itemscope
        itemtype="https://schema.org/ItemList"
        data-testid="skills-list"
      >
        <li
          v-for="(skill, index) in skills"
          :key="skill.name"
          role="listitem"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
          :data-testid="`skill-item-${index}`"
        >
          <span class="skill" itemprop="name">
            <a
              v-if="skill.link"
              :href="skill.link"
              target="_blank"
              rel="noopener"
            >
              {{ skill.name }}
            </a>
            <template v-else>
              {{ skill.name }}
            </template>
          </span>
          <meta itemprop="position" :content="String(index + 1)" >
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
