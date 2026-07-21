import type { GlobalConfig } from 'payload'

export const SEODefaults: GlobalConfig = {
  slug: 'seo-defaults',
  fields: [
    {
      name: 'defaultMetaTitle',
      type: 'text',
      required: true,
      defaultValue: 'Sunday Vibes | Premium Growth & Systems Agency',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'Mitra strategis optimasi konversi, otomatisasi sistem bisnis berbasis AI, & pengembangan infrastruktur IT modern.',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
