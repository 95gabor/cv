<template>
  <section class="section">
    <UContainer>
      <h2 id="skills" class="section-title">
        <a href="#skills"># {{ t('cv.skills') }}</a>
      </h2>
      <UCard>
        <div class="skills-list" role="list">
          <ul
            class="skills-grid"
            role="list"
            itemscope
            itemtype="https://schema.org/ItemList"
          >
            <li
              v-for="(skill, index) in skills"
              :key="skill.name"
              class="skill-item"
              role="listitem"
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
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
              <meta itemprop="position" :content="index + 1" />
            </li>
          </ul>
        </div>
      </UCard>
    </UContainer>
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
