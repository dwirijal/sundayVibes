import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  fields: [
    {
      name: 'address',
      type: 'textarea',
      required: true,
      defaultValue: 'Surabaya, Jawa Timur\nIndonesia',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      defaultValue: '6285157319611',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'hello@sundayvibes.id',
    },
    {
      name: 'operationalHours',
      type: 'textarea',
      defaultValue: 'Senin - Sabtu: 09.00 - 18.00\nMinggu: By appointment',
    },
  ],
}
