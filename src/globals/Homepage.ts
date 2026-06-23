import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'heroHeadline',
      type: 'text',
      required: true,
      defaultValue: 'Karya terbaik, tanpa pusing.',
    },
    {
      name: 'heroSubheadline',
      type: 'textarea',
      required: true,
      defaultValue: 'Dari konsep event hingga foto produk yang siap publish. Sunday Vibes menyatukan seluruh kebutuhan kreatif dan teknis Anda dalam satu ekosistem yang terintegrasi, transparan, dan profesional.',
    },
    {
      name: 'aboutSnippet',
      type: 'textarea',
    },
  ],
}
