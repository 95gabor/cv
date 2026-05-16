<script setup lang="ts">
import './SectionTitle.scss';

withDefaults(
  defineProps<{
    id: string;
    label: string;
    href?: string;
    prefix?: string;
    accent?: boolean;
    contrastContext?: 'light' | 'dark';
  }>(),
  {
    href: undefined,
    prefix: '# ',
    accent: false,
    contrastContext: 'light',
  },
);
</script>

<template>
  <h2
    :id="id"
    :class="[
      'section-title',
      {
        'section-title--accent': accent,
        'section-title--on-dark': contrastContext === 'dark',
      },
    ]"
  >
    <a :href="href || `#${id}`">{{ prefix }}{{ label }}</a>
  </h2>
</template>
