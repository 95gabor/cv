<template>
  <section class="text-center py-10 bg-gray-700">
    <h2 id="hobbies" class="section-title">
      <a href="#hobbies"># {{ t('cv.hobbies') }}</a>
    </h2>
    <ul
      class="hobby-list"
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
        <span v-if="hobby.link">
          <a
            :href="hobby.link"
            target="_blank"
            class="text-blue-400 underline"
            itemprop="url"
            rel="noopener"
          >
            <span itemprop="name">{{ hobby.name[lang] }}</span>
          </a>
        </span>
        <span v-else itemprop="name">{{ hobby.name[lang] }}</span>
        <meta itemprop="position" :content="index + 1" />
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
