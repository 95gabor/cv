<template>
  <section
    class="text-center py-10 bg-gray-700"
    data-testid="education-section"
  >
    <SectionTitle id="education" accent :label="t('cv.education')" />
    <div class="space-y-6" role="list" data-testid="education-list">
      <article
        v-for="(edu, idx) in educations"
        :key="edu.degree[lang]"
        class="education-item"
        role="listitem"
        itemscope
        itemtype="https://schema.org/EducationalOccupationalCredential"
        :data-testid="`education-item-${idx}`"
      >
        <h3 class="education-degree heading-3" itemprop="name">
          {{ edu.degree[lang] }}
        </h3>
        <div class="education-details">
          <span class="meta-text">
            <time :datetime="edu.from" itemprop="dateCreated">{{
              formatPeriod(edu.from, edu.end)
            }}</time>
            <span class="meta-separator">|</span>
            <span
              itemprop="recognizedBy"
              itemscope
              itemtype="https://schema.org/EducationalOrganization"
            >
              <span itemprop="name">
                <InlineLink class="education-link" :href="edu.institution.link">
                  {{ edu.institution.name[lang] }}
                </InlineLink>
              </span>
            </span>
            <span class="meta-separator">|</span>
            <span itemprop="credentialCategory">{{ edu.location }}</span>
          </span>
        </div>
        <p v-if="edu.note" itemprop="description">{{ edu.note[lang] }}</p>
        <meta itemprop="dateCreated" :content="edu.from" >
        <meta v-if="edu.end" itemprop="dateModified" :content="edu.end" >
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import './Education.scss';
import type { CVSupportedLangs, Education as EducationType } from '~/types/cv';
import InlineLink from '../ui/InlineLink.vue';
import SectionTitle from '../ui/SectionTitle.vue';

const { t } = useI18n();

defineProps<{
  educations: EducationType[];
  lang: CVSupportedLangs;
}>();

const formatPeriod = (from: string, end?: string) => {
  return end ? `${from} - ${end}` : from;
};
</script>
