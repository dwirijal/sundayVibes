import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
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
      type: 'relationship',
      relationTo: 'services',
      hasMany: false,
    },
    {
      name: 'client',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        }
      ]
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'tech_stack',
      type: 'array',
      fields: [
        {
          name: 'tech',
          type: 'text',
        }
      ]
    },
    {
      name: 'result',
      type: 'richText',
    }
  ],
}
