<script setup lang="ts">
import './Header.scss';
import type { CVSupportedLangs, Contact, Personal } from '~/types/cv';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  personal: Personal;
  lang: CVSupportedLangs;
}>();

const leftContacts = computed(() => props.personal.contact.slice(0, 2));
const rightContacts = computed(() => props.personal.contact.slice(2));

function getContactHref(contact: Contact) {
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

function getSocialLinkTestId(platform: string) {
  return `social-link-${platform.toLowerCase()}`;
}

function getContactTestId(position: 'left' | 'right', idx: number) {
  return `contact-${position}-${idx}`;
}
</script>

<template>
  <div class="cv-header" data-testid="cv-header">
    <!-- Row 1: Social Links -->
    <div class="header-social-row" data-testid="header-social-links">
      <a
        v-for="link in props.personal.links"
        :key="link.platform"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="header-social-link"
        :aria-label="link.platform"
        :data-testid="getSocialLinkTestId(link.platform)"
      >
        <img
          :src="link.icon"
          :alt="link.platform"
          :title="link.platform"
          class="header-social-icon"
        >
      </a>
    </div>

    <!-- Row 2: Name -->
    <h1 class="header-name" data-testid="header-name">
      {{ props.personal.name[props.lang] }}
    </h1>

    <!-- Row 3: Title with lines -->
    <div class="header-title-row">
      <hr class="header-title-line" >
      <span class="header-title" data-testid="header-title">{{
        props.personal.title[props.lang]
      }}</span>
      <hr class="header-title-line" >
    </div>

    <!-- Row 4: Contact Info and Avatar -->
    <div class="header-contact-row" data-testid="header-contact-row">
      <div
        class="header-contact-col header-contact-left"
        data-testid="header-contact-left"
      >
        <div
          v-for="(contact, idx) in leftContacts"
          :key="`${contact.type}-${contact.value}`"
          :data-testid="getContactTestId('left', idx)"
        >
          <b>{{ t(`contact.${contact.type}`) }}</b
          ><br >
          <a
            :href="getContactHref(contact)"
            class="header-contact-link"
            target="_blank"
            rel="noopener"
            >{{ contact.value }}</a
          >
        </div>
      </div>
      <div class="header-avatar-col">
        <img
          :src="props.personal.picture"
          :alt="props.personal.name[props.lang]"
          :title="props.personal.name[props.lang]"
          class="header-avatar"
          fetchpriority="high"
          data-testid="header-avatar"
        >
      </div>
      <div
        class="header-contact-col header-contact-right"
        data-testid="header-contact-right"
      >
        <div
          v-for="(contact, idx) in rightContacts"
          :key="`${contact.type}-${contact.value}`"
          :data-testid="getContactTestId('right', idx)"
        >
          <b>{{ t(`contact.${contact.type}`) }}</b
          ><br >
          <a
            :href="getContactHref(contact)"
            class="header-contact-link"
            target="_blank"
            rel="noopener"
            >{{ contact.value }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
