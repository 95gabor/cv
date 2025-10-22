<template>
  <MetaData />
  <div class="app" :class="{ loading: pending }">
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <div class="grid-background" />

    <!-- Ultra-sophisticated animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Primary gradient orbs with morphing -->
      <div
        class="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full blur-3xl animate-pulse opacity-30 animate-morphing"
      ></div>
      <div
        class="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000 opacity-30 animate-morphing"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl animate-pulse delay-2000 opacity-20 animate-morphing"
      ></div>

      <!-- Enhanced floating geometric shapes with neon glow -->
      <div
        class="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-40 animate-neon-glow"
      ></div>
      <div
        class="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-1000 opacity-50 animate-neon-glow"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-2000 opacity-30 animate-neon-glow"
      ></div>
      <div
        class="absolute top-1/3 left-2/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-3000 opacity-60 animate-neon-glow"
      ></div>
      <div
        class="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-1500 opacity-40 animate-neon-glow"
      ></div>

      <!-- Particle system -->
      <div
        class="absolute top-1/6 left-1/6 w-2 h-2 bg-yellow-400 rounded-full animate-particle-float opacity-60"
      ></div>
      <div
        class="absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-green-400 rounded-full animate-particle-float delay-500 opacity-50"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-red-400 rounded-full animate-particle-float delay-1000 opacity-40"
      ></div>
      <div
        class="absolute top-1/2 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-particle-float delay-1500 opacity-70"
      ></div>

      <!-- Liquid flow effects -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-liquid-flow opacity-30"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-500 to-transparent animate-liquid-flow delay-1000 opacity-30"
      ></div>
    </div>

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
          <main
            id="main-content"
            class="main-content"
            role="main"
            tabindex="-1"
          >
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
