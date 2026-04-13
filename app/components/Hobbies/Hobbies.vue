<template>
  <section class="text-center py-10 bg-gray-700" data-testid="hobbies-section">
    <SectionTitle id="hobbies" accent :label="t('cv.hobbies')" />
    <ul
      class="hobby-list"
      role="list"
      itemscope
      itemtype="https://schema.org/ItemList"
      data-testid="hobbies-list"
    >
      <li
        v-for="(hobby, index) in hobbies"
        :key="hobby.name[lang]"
        class="hobby-item"
        role="listitem"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        :data-testid="`hobby-item-${index}`"
      >
        <InlineLink
          v-if="hobby.link"
          :href="hobby.link"
          class="text-blue-400 underline"
          itemprop="url"
        >
          <span itemprop="name">{{ hobby.name[lang] }}</span>
        </InlineLink>
        <span v-else itemprop="name">{{ hobby.name[lang] }}</span>
        <meta itemprop="position" :content="String(index + 1)" >
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import './Hobbies.scss';
import type { CVSupportedLangs, Hobby } from '~/types/cv';
import InlineLink from '../ui/InlineLink.vue';
import SectionTitle from '../ui/SectionTitle.vue';

const { t } = useI18n();

defineProps<{
  hobbies: Hobby[];
  lang: CVSupportedLangs;
}>();
</script>
