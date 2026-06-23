import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can see all projects
      if (user?.role === 'admin') {
        return true
      }
      // Clients can only see their own projects
      if (user) {
        return {
          client: {
            equals: user.id,
          },
        }
      }
      // Not authenticated - no access
      return false
    },
    create: ({ req: { user } }) => {
      // Only authenticated users can create projects
      return !!user
    },
    update: ({ req: { user } }) => {
      // Only admins can update projects
      return user?.role === 'admin'
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete projects
      return user?.role === 'admin'
    },
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
