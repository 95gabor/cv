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
            <article itemscope itemtype="https://schema.org/Person">
              <LanguageSelector />
              <section>
                <Experience :experiences="cv.workExperience" />
              </section>
              <section>
                <Education :educations="cv.educations" />
              </section>
              <section>
                <Skills :skills="cv.skills" />
              </section>
              <section>
                <Hobbies :hobbies="cv.hobbies" />
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
import type { CV } from '~/types/cv';
import Header from './components/Header/Header.vue';
import Experience from './components/Experience/Experience.vue';
import Education from './components/Education/Education.vue';
import Skills from './components/Skills/Skills.vue';
import Hobbies from './components/Hobbies/Hobbies.vue';
import CookieConsent from './components/CookieConsent.vue';
import LanguageSelector from './components/LanguageSelector.vue';

const i18n = useI18n();

// Initial load
const { data: cv, pending, refresh } = await useAsyncData<CV>('cv', () => 
    queryCollection('cv')
      .where('stem', '=', i18n.locale.value)
      .first() as any as Promise<CV>
  );

// Watch for locale changes
watch(() => i18n.locale.value, async () => {
  await refresh();
});

// SEO meta tags
useHead({
  title: 'Gábor Pichner | TypeScript Full-Stack Developer',
  meta: [
    {
      name: 'description',
      content: 'Experienced TypeScript Full-Stack Developer specializing in modern web technologies, cloud architecture, and DevOps. Expert in NestJS, Angular, and cloud platforms (AWS, Azure, GCP). Passionate about clean code, infrastructure as code, and building scalable applications.'
    },
    {
      name: 'keywords',
      content: 'TypeScript, JavaScript, NodeJS, NestJS, Angular, React, HTML, CSS, SCSS, SQL, NoSQL, PostgreSQL, MySQL, MongoDB, Docker, Kubernetes, Terraform, AWS, Azure, GCP, CI/CD, DevOps, Git, JWT, OAuth, REST API, Microservices, Clean Code, Unit Testing, Jest, Mocha'
    },
    {
      property: 'og:title',
      content: 'Gábor Pichner\'s CV | TypeScript Full-Stack Developer'
    },
    {
      property: 'og:description',
      content: 'Experienced TypeScript Full-Stack Developer specializing in modern web technologies, cloud architecture, and DevOps. Expert in NestJS, Angular, and cloud platforms (AWS, Azure, GCP). Passionate about clean code, infrastructure as code, and building scalable applications.'
    },
    {
      property: 'og:type',
      content: 'profile'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://95gabor.me'
    }
  ]
});
</script>

