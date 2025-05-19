import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cv: defineCollection({
      type: 'data',
      source: 'cv.yaml',
      schema: z.object({
        personal: z.object({
          name: z.string(),
          title: z.string(),
          picture: z.string(),
          links: z.array(
            z.object({
              platform: z.string(),
              url: z.string(),
              icon: z.string()
            })
          ),
          contact: z.array(
            z.object({
              title: z.string(),
              type: z.enum(['location', 'phone', 'email', 'link']),
              value: z.string()
            })
          )
        }),
        workExperience: z.array(
          z.object({
            title: z.string(),
            company: z.string().optional(),
            location: z.string(),
            period: z.string(),
            description: z.string().optional(),
            technologies: z.array(z.string())
          })
        ),
        educations: z.array(
          z.object({
            degree: z.string(),
            institution: z.string(),
            location: z.string(),
            period: z.string(),
            note: z.string().optional()
          })
        ),
        skills: z.array(z.string()),
        hobbies: z.array(
          z.object({
            name: z.string(),
            link: z.string().optional()
          })
        )
      })
    })
  }
})
