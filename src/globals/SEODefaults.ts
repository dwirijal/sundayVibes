import type { GlobalConfig } from 'payload'

export const SEODefaults: GlobalConfig = {
  slug: 'seo-defaults',
  fields: [
    {
      name: 'defaultMetaTitle',
      type: 'text',
      required: true,
      defaultValue: 'Sunday Vibes | One-Stop Creative Platform',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'Platform digital multifungsi yang menyatukan seluruh layanan kreatif dan teknis dalam satu ekosistem terintegrasi.',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
