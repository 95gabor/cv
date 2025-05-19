<script setup lang="ts">
import './Header.scss'
import type { Personal } from '~/types/cv';

defineProps<{
  personal: Personal;
}>();
</script>

<template>
  <div class="cv-header">
    <!-- Row 1: Social Links -->
    <div class="header-social-row">
      <a v-for="link in personal.links" :key="link.platform" :href="link.url" target="_blank" rel="noopener" class="header-social-link" :aria-label="link.platform">
        <img :src="link.icon" :alt="link.platform" class="header-social-icon" />
      </a>
    </div>

    <!-- Row 2: Name -->
    <h1 class="header-name">{{ personal.name }}</h1>

    <!-- Row 3: Title with lines -->
    <div class="header-title-row">
      <hr class="header-title-line" />
      <span class="header-title">{{ personal.title }}</span>
      <hr class="header-title-line" />
    </div>

    <!-- Row 4: Contact Info and Avatar -->
    <div class="header-contact-row">
      <div class="header-contact-col header-contact-left">
        <div v-for="contact in personal.contact.slice(0, 2)" :key="contact.title">
          <b>{{ contact.title }}</b><br />
          <a :href="getContactHref(contact)" class="header-contact-link" target="_blank">{{ contact.value }}</a>
        </div>
      </div>
      <div class="header-avatar-col">
        <img :src="personal.picture" :alt="personal.name" class="header-avatar" />
      </div>
      <div class="header-contact-col header-contact-right">
        <div v-for="contact in personal.contact.slice(2)" :key="contact.title">
          <b>{{ contact.title }}</b><br />
          <a :href="getContactHref(contact)" class="header-contact-link" target="_blank">{{ contact.value }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
function getContactHref(contact: { type: string; value: string }) {
  switch (contact.type) {
    case 'email':
      return `mailto:${contact.value}`;
    case 'phone':
      return `tel:${contact.value}`;
    case 'link':
      return contact.value;
    case 'location':
      return `https://google.hu/maps/place/${encodeURIComponent(contact.value)}`;
    default:
      return contact.value;
  }
}
</script>