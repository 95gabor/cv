<template>
  <section class="section">
    <UContainer>
      <h2 id="work-experience" class="section-title">
        <a href="#work-experience"># {{ t('cv.workExperience') }}</a>
      </h2>
      <UCard>
        <div class="experience-list">
          <div v-for="(job, idx) in experiences" :key="job.description.en" class="job-item">
            <div class="job-content">
              <div class="job-header">
                <h3 class="heading-3">{{ job.title[lang] }}</h3>
                <div class="job-meta">
                  <span class="meta-text">
                    {{ formatPeriod(job.from, job.end) }}
                    <span class="meta-separator">|</span>
                    <a
                      v-if="job.companyUrl"
                      :href="job.companyUrl"
                      target="_blank"
                      rel="noopener"
                      class="company-link"
                      >{{ job.company }}</a
                    >
                    <template v-else>{{ job.company }}</template>
                    <span class="meta-separator">|</span>
                    {{ job.location }}
                  </span>
                </div>
              </div>
              <p v-if="job.description" class="description">
                {{ job.description[lang] }}
              </p>
              <div class="technologies">
                <span class="tech-label">{{ t('experience.technologies') }}</span>
                <ul class="tech-list">
                  <li v-for="tech in job.technologies" :key="tech" class="tech-item">
                    {{ tech }}
                  </li>
                </ul>
              </div>
            </div>
            <hr v-if="idx < experiences.length - 1" class="job-divider" />
          </div>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import './Experience.scss';
import type { CVSupportedLangs, WorkExperience } from '~/types/cv';

const { t } = useI18n();

defineProps<{
  experiences: WorkExperience[];
  lang: CVSupportedLangs;
}>();

const formatPeriod = (from: string, end?: string) => {
  return `${from} - ${end || t('experience.present')}`;
};
</script>

<style lang="scss" scoped>
.job-meta {
  margin-top: 0.5rem;
}

.meta-text {
  color: var(--color-gray-500);
  font-size: 0.875rem;
}

.meta-separator {
  margin: 0 0.5rem;
  color: var(--color-gray-400);
}

.company-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
}
</style>
