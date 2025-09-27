<!-- eslint-disable vue/valid-template-root -->
<template>
  <!-- Meta data is injected via useHead -->
</template>

<script setup lang="ts">
import { siteConfig } from '~~/config';

// SEO meta tags
useHead({
  title: siteConfig.title,
  meta: [
    {
      property: 'og:title',
      content: siteConfig.title,
    },
    {
      name: 'description',
      content: siteConfig.description,
    },
    {
      name: 'keywords',
      content: siteConfig.keywords.join(', '),
    },
    {
      property: 'og:description',
      content: siteConfig.description,
    },
    {
      property: 'og:type',
      content: 'profile',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: siteConfig.url,
    },
  ],
});
</script>
