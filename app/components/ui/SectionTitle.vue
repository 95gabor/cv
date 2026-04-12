<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    label: string;
    href?: string;
    prefix?: string;
  }>(),
  {
    href: undefined,
    prefix: '# ',
  },
);
</script>

<template>
  <h2 :id="id" class="section-title">
    <a :href="href || `#${id}`">{{ prefix }}{{ label }}</a>
  </h2>
</template>
