import { defineConfig, defineFields } from '@geniusofdigital/astro-cms/config'

export default defineConfig({
  collections: {
    posts: {
      label: 'Articles',
      fields: {
        title:   defineFields.text({ label: 'Titre', required: true }),
        content: defineFields.richtext({ label: 'Contenu' }),
        status:  defineFields.select(['draft', 'published'], { label: 'Statut' }),
        image:   defineFields.media({ label: 'Image' }),
      },
    },
  },
})