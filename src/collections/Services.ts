import type { CollectionConfig } from 'payload'
import { adminOnly, publicRead } from '@/lib/access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: publicRead,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Event Organizer', value: 'events' },
        { label: 'Digital Product', value: 'digital' },
        { label: 'Sewa Alat', value: 'sewa-alat' },
        { label: 'Design & Web', value: 'design' },
        { label: 'Photography', value: 'photography' },
        { label: 'Strategy & Consulting', value: 'strategy' },
        { label: 'Performance & Analytics', value: 'performance' },
        { label: 'AI & Systems Automation', value: 'automation' },
        { label: 'Growth Packages', value: 'growth-packages' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'packages',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'hero_image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
