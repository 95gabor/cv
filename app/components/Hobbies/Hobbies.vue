<template>
  <section class="section">
    <UContainer>
      <h2 id="hobbies" class="section-title">
        <a href="#hobbies"># {{ t('cv.hobbies') }}</a>
      </h2>
      <UCard>
        <div class="hobbies-list" role="list">
          <ul
            class="hobbies-grid"
            role="list"
            itemscope
            itemtype="https://schema.org/ItemList"
          >
            <li
              v-for="(hobby, index) in hobbies"
              :key="hobby.name[lang]"
              class="hobby-item"
              role="listitem"
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <span class="hobby" itemprop="name">
                <a
                  v-if="hobby.link"
                  :href="hobby.link"
                  target="_blank"
                  rel="noopener"
                >
                  {{ hobby.name[lang] }}
                </a>
                <template v-else>
                  {{ hobby.name[lang] }}
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
import './Hobbies.scss';
import type { CVSupportedLangs, Hobby } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  hobbies: Hobby[];
  lang: CVSupportedLangs;
}>();
</script>
