<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
    ariaLabel?: string;
    title?: string;
  }>(),
  {
    href: undefined,
    target: '_blank',
    rel: 'noopener',
    ariaLabel: undefined,
    title: undefined,
  },
);
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    :target="href ? target : undefined"
    :rel="href ? rel : undefined"
    :aria-label="ariaLabel"
    :title="title"
  >
    <slot />
  </component>
</template>
