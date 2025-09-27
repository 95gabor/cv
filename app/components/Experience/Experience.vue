<template>
  <section class="section">
    <UContainer>
      <h2 id="work-experience" class="section-title">
        <a href="#work-experience"># {{ t('cv.workExperience') }}</a>
      </h2>
      <UCard>
        <div class="experience-list" role="list">
          <article
            v-for="(job, idx) in experiences"
            :key="job.description.en"
            class="job-item"
            role="listitem"
            itemscope
            itemtype="https://schema.org/JobPosting"
          >
            <div class="job-content">
              <header class="job-header">
                <h3 class="heading-3" itemprop="title">{{ job.title[lang] }}</h3>
                <div class="job-meta">
                  <span class="meta-text">
                    <time :datetime="job.from" itemprop="datePosted">{{ formatPeriod(job.from, job.end) }}</time>
                    <span class="meta-separator">|</span>
                    <span itemprop="hiringOrganization" itemscope itemtype="https://schema.org/Organization">
                      <a
                        v-if="job.company.link"
                        :href="job.company.link"
                        target="_blank"
                        rel="noopener"
                        class="company-link"
                        itemprop="url"
                      >
                        <span itemprop="name">{{ job.company.name }}</span>
                      </a>
                      <span v-else itemprop="name">{{ job.company.name }}</span>
                    </span>
                    <template v-if="job.employmentType">
                      <span class="meta-separator">|</span>
                      <span itemprop="jobLocation" itemscope itemtype="https://schema.org/Place">
                        <span itemprop="addressLocality">{{
                          t(`experience.employmentType.${job.employmentType}`)
                        }}</span>
                      </span>
                    </template>
                    <span class="meta-separator">|</span>
                    <span itemprop="jobLocation" itemscope itemtype="https://schema.org/Place">
                      <span itemprop="addressLocality">{{ job.location }}</span>
                    </span>
                  </span>
                </div>
              </header>
              <div v-if="job.description" class="description" itemprop="description">
                <p>
                  {{ job.description[lang] }}
                </p>
              </div>
              <div class="technologies">
                <span class="tech-label">{{ t('experience.technologies') }}</span>
                <ul class="tech-list" role="list">
                  <li v-for="tech in job.technologies" :key="tech" class="tech-item" role="listitem">
                    <span itemprop="skills">{{ tech }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <hr v-if="idx < experiences.length - 1" class="job-divider" />
          </article>
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
    color: $primary-color;
    text-decoration: underline;
  }
}
</style>
