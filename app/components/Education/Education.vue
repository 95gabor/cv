<template>
  <section class="text-center py-10 bg-gray-700">
    <h2 id="education" class="section-title">
      <a href="#education"># {{ t('cv.education') }}</a>
    </h2>
    <div class="space-y-6" role="list">
      <article
        v-for="edu in educations"
        :key="edu.degree[lang]"
        class="education-item"
        role="listitem"
        itemscope
        itemtype="https://schema.org/EducationalOccupationalCredential"
      >
        <h3 class="education-degree heading-3" itemprop="name">{{ edu.degree[lang] }}</h3>
        <div class="education-details">
          <span itemprop="recognizedBy" itemscope itemtype="https://schema.org/EducationalOrganization">
            <span itemprop="name">
              <a class="education-link" :href="edu.institution.link || '#'" target="_blank">
                {{ edu.institution.name[lang] }}
              </a>
            </span>
          </span>
          <span class="meta-separator"> / </span>
          <span itemprop="credentialCategory">{{ edu.location }}</span>
        </div>
        <p v-if="edu.note" itemprop="description">{{ edu.note[lang] }}</p>
        <meta itemprop="dateCreated" :content="edu.from" />
        <meta v-if="edu.end" itemprop="dateModified" :content="edu.end" />
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import './Education.scss';
import type { CVSupportedLangs, Education as EducationType } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  educations: EducationType[];
  lang: CVSupportedLangs;
}>();
</script>
