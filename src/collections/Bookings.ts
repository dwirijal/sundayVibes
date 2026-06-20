import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
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
