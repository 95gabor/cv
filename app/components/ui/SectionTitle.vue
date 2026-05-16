<script setup lang="ts">
import './SectionTitle.scss';

withDefaults(
  defineProps<{
    id: string;
    label: string;
    href?: string;
    prefix?: string;
    accent?: boolean;
  }>(),
  {
    href: undefined,
    prefix: '# ',
    accent: false,
  },
);
</script>

<template>
  <h2
    :id="id"
    :class="['section-title', { 'section-title--accent': accent }]"
  >
    <a :href="href || `#${id}`">{{ prefix }}{{ label }}</a>
  </h2>
</template>
