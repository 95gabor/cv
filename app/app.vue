<template>
  <MetaData />
  <div class="app">
    <div class="grid-background" />

    <UContainer class="cv-container">
      <div class="cv-content">
        <template v-if="pending">
          <!-- Header Skeleton -->
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-header">
              <div class="skeleton-avatar" />
              <div class="skeleton-info">
                <div class="skeleton-title" />
                <div class="skeleton-subtitle" />
                <div class="skeleton-buttons">
                  <div class="skeleton-button" />
                  <div class="skeleton-button" />
                </div>
              </div>
            </div>
          </UCard>

          <!-- Section Skeletons -->
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title" />
            <div class="skeleton-content">
              <div class="skeleton-line" />
              <div class="skeleton-line" />
              <div class="skeleton-line" />
              <div class="skeleton-tags">
                <div class="skeleton-tag" />
                <div class="skeleton-tag" />
                <div class="skeleton-tag" />
              </div>
            </div>
          </UCard>
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title" />
            <div class="skeleton-content">
              <div class="skeleton-line" />
              <div class="skeleton-line" />
              <div class="skeleton-line" />
            </div>
          </UCard>
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title" />
            <div class="skeleton-content">
              <div class="skeleton-line" />
              <div class="skeleton-line" />
            </div>
          </UCard>
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title" />
            <div class="skeleton-content">
              <div class="skeleton-line" />
            </div>
          </UCard>
        </template>

        <template v-else-if="cv">
          <!-- Structured Data for LLMs -->
          <StructuredData :cv="cv" :lang="i18n.locale.value" />

          <header role="banner">
            <Header :personal="cv.personal" :lang="i18n.locale.value" />
          </header>
          <main class="main-content" role="main">
            <article itemscope itemtype="https://schema.org/Person">
              <LanguageSelector />
              <section aria-labelledby="work-experience">
                <Experience
                  :experiences="cv.workExperience"
                  :lang="i18n.locale.value"
                />
              </section>
              <section aria-labelledby="education">
                <Education
                  :educations="cv.educations"
                  :lang="i18n.locale.value"
                />
              </section>
              <section aria-labelledby="skills">
                <Skills :skills="cv.skills" :lang="i18n.locale.value" />
              </section>
              <section aria-labelledby="hobbies">
                <Hobbies :hobbies="cv.hobbies" :lang="i18n.locale.value" />
              </section>
            </article>
          </main>
        </template>
      </div>
    </UContainer>
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import './app.scss';
import Header from './components/Header/Header.vue';
import Experience from './components/Experience/Experience.vue';
import Education from './components/Education/Education.vue';
import Skills from './components/Skills/Skills.vue';
import Hobbies from './components/Hobbies/Hobbies.vue';
import CookieConsent from './components/CookieConsent.vue';
import LanguageSelector from './components/LanguageSelector.vue';
import MetaData from './components/MetaData.vue';
import StructuredData from './components/StructuredData.vue';
import type { CvCollectionItem } from '@nuxt/content';
import { siteConfig } from '../config';

const i18n = useI18n();

// Initial load
const { data: cv, pending } = await useAsyncData<CvCollectionItem | null>(
  'cv',
  () =>
    queryCollection('cv')
      .where('stem', '=', 'gabor-pichner')
      .first() as Promise<CvCollectionItem>,
);
</script>
