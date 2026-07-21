import type { CollectionConfig } from 'payload'
import { adminOnly, publicRead } from '@/lib/access'

export const Photos: CollectionConfig = {
  slug: 'photos',
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
      type: 'text',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'price_standard',
      type: 'number',
      required: true,
    },
    {
      name: 'price_extended',
      type: 'number',
      required: true,
    },
    {
      name: 'file_hires',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'preview_watermark',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'orientation',
      type: 'select',
      options: [
        { label: 'Landscape', value: 'landscape' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Square', value: 'square' },
      ],
      defaultValue: 'landscape',
    },
  ],
}
