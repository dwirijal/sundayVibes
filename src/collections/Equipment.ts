import type { CollectionConfig } from 'payload'

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
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
      name: 'specs',
      type: 'richText',
    },
    {
      name: 'price_per_day',
      type: 'number',
      required: true,
    },
    {
      name: 'deposit',
      type: 'number',
      required: true,
    },
    {
      name: 'available',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    }
  ],
}
