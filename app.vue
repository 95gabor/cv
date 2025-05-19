<template>
  <div class="app">
    <div class="grid-background"></div>
    
    <UContainer class="cv-container">
      <div class="cv-content">
        <template v-if="pending">
          <!-- Header Skeleton -->
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-header">
              <div class="skeleton-avatar"></div>
              <div class="skeleton-info">
                <div class="skeleton-title"></div>
                <div class="skeleton-subtitle"></div>
                <div class="skeleton-buttons">
                  <div class="skeleton-button"></div>
                  <div class="skeleton-button"></div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Section Skeletons -->
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title"></div>
            <div class="skeleton-content">
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-tags">
                <div class="skeleton-tag"></div>
                <div class="skeleton-tag"></div>
                <div class="skeleton-tag"></div>
              </div>
            </div>
          </UCard>
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title"></div>
            <div class="skeleton-content">
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
            </div>
          </UCard>
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title"></div>
            <div class="skeleton-content">
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
            </div>
          </UCard>
          <UCard class="cv-card animate-pulse">
            <div class="skeleton-section-title"></div>
            <div class="skeleton-content">
              <div class="skeleton-line"></div>
            </div>
          </UCard>
        </template>
        
        <template v-else-if="cv">
          <header>
            <Header :personal="cv.personal" />
          </header>
          <main class="main-content">
            <Experience :experiences="cv.workExperience" />
            <Education :educations="cv.educations" />
            <Skills :skills="cv.skills" />
            <Hobbies :hobbies="cv.hobbies" />
          </main>
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import './app.scss';
import type { CV } from '~/types/cv';
import Header from './components/Header/Header.vue';
import Experience from './components/Experience/Experience.vue';
import Education from './components/Education/Education.vue';
import Skills from './components/Skills/Skills.vue';
import Hobbies from './components/Hobbies/Hobbies.vue';

const { data: cv, pending, refresh } = await useAsyncData('cv', () => 
  queryCollection('cv').first()
);
</script>
