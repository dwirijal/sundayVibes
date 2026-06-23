import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
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
      name: 'type',
      type: 'select',
      options: [
        { label: 'Template', value: 'template' },
        { label: 'E-Book', value: 'ebook' },
        { label: 'Asset', value: 'asset' },
        { label: 'Course', value: 'course' },
      ],
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'file_download',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'license_type',
      type: 'select',
      options: [
        { label: 'Personal', value: 'personal' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Extended', value: 'extended' },
      ],
      defaultValue: 'personal',
    }
  ],
}
