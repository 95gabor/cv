<!-- eslint-disable-next-line vue/valid-template-root -->
<template>
  <!-- Structured data is injected via useHead -->
</template>

<script setup lang="ts">
import type { CV } from '~/types/cv';

const props = defineProps<{
  cv: CV;
  lang: 'en' | 'hu';
}>();

const { $config } = useNuxtApp();

const structuredData = computed(() => {
  // Get site URL from CV data or fallback to config
  const siteUrl = props.cv?.site?.url || $config.public.siteUrl || 'https://example.com';

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: props.cv.personal.name[props.lang],
    jobTitle: props.cv.personal.title[props.lang],
    image: `${siteUrl}${props.cv.personal.picture}`,
    url: siteUrl,
    sameAs: props.cv.personal.links.map(link => link.url),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HU',
      addressLocality: 'Hungary',
    },
    email: props.cv.personal.contact.find(c => c.type === 'email')?.value,
    telephone: props.cv.personal.contact.find(c => c.type === 'phone')?.value,
    worksFor: props.cv.workExperience.map(job => ({
      '@type': 'Organization',
      name: job.company,
      url: job.companyUrl || undefined,
    })),
    alumniOf: props.cv.educations.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.institution[props.lang],
      address: {
        '@type': 'PostalAddress',
        addressLocality: edu.location,
      },
    })),
    knowsAbout: props.cv.skills.map(skill => skill[props.lang]),
    hasOccupation: props.cv.workExperience.map(job => ({
      '@type': 'Occupation',
      name: job.title[props.lang],
      occupationLocation: {
        '@type': 'City',
        name: job.location,
      },
      description: job.description[props.lang],
      skills: job.technologies,
      startDate: job.from,
      endDate: job.end || undefined,
    })),
  };

  return JSON.stringify(person, null, 2);
});

// Inject structured data into document head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: structuredData.value,
    },
  ],
});
</script>
