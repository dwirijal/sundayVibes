import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can view all users
      if (user?.role === 'admin') return true;
      // Users can only view their own profile
      if (user) {
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    create: () => true, // Registration endpoint handles this, or Admins via CMS
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      if (user) {
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Client', value: 'client' },
      ],
      defaultValue: 'client',
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
  ],
}
