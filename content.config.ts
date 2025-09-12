import { defineCollection, defineContentConfig } from '@nuxt/content';
import { CVSchema } from './app/types/cv';

export default defineContentConfig({
  collections: {
    cv: defineCollection({
      type: 'data',
      source: '*.yaml',
      schema: CVSchema,
    }),
  },
});
