<template>
  <section class="section">
    <UContainer>
      <h2 class="section-title" id="work-experience">
        <a href="#work-experience"># Work Experience</a>
      </h2>
      <UCard class="cv-card">
        <div class="experience-list">
          <div v-for="(job, idx) in experiences" :key="job.title" class="job-item">
            <div class="job-content">
              <div class="job-header">
                <h3 class="heading-3">{{ job.title }}</h3>
                <div class="job-meta">
                  <UBadge color="gray" variant="soft" class="period-badge">
                    {{ job.period }}
                  </UBadge>
                  <span class="meta-separator">|</span>
                  <span class="location">{{ job.location }}</span>
                </div>
              </div>
              <div class="job-subheader">
                <p v-if="job.company" class="company">{{ job.company }}</p>
                <UBadge v-if="job.company" color="gray" variant="soft" class="separator">•</UBadge>
              </div>
              <p v-if="job.description" class="description">
                {{ job.description }}
              </p>
              <div class="technologies">
                <span class="tech-label">Technologies</span>
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
import type { WorkExperience } from '~/types/cv';

defineProps<{
  experiences: WorkExperience[];
}>();
</script>