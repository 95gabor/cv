<template>
  <section class="text-center py-10" data-testid="skills-section">
    <SectionTitle id="skills" accent :label="t('cv.skills')" />
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
            <InlineLink v-if="skill.link" :href="skill.link">
              {{ skill.name }}
            </InlineLink>
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
import InlineLink from '../ui/InlineLink.vue';
import SectionTitle from '../ui/SectionTitle.vue';

const { t } = useI18n();

defineProps<{
  skills: Skill[];
  lang: CVSupportedLangs;
}>();
</script>
