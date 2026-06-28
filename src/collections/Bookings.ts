import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can see all bookings
      if (user?.role === 'admin') {
        return true
      }
      // Clients can only see their own bookings
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
      // Only authenticated users can create bookings
      return !!user
    },
    update: ({ req: { user } }) => {
      // Only admins can update bookings
      return user?.role === 'admin'
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete bookings
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'order_id',
      type: 'text',
      unique: true,
      admin: {
        description: 'Order ID (e.g. ORD-1234567890-abcd)',
      },
    },
    {
      name: 'service_type',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'payment_status',
      type: 'select',
      options: [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Partial', value: 'partial' },
        { label: 'Paid', value: 'paid' },
      ],
      defaultValue: 'unpaid',
      required: true,
    }
  ],
}
