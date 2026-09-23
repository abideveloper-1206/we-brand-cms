import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
      },
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'callToActionText',
      type: 'text',
      defaultValue: "Let's Talk",
    },
    {
      name: 'callToActionUrl',
      type: 'text',
      defaultValue: "/contact-us",
    },
    {
      name: 'whatsappLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
      },
    },
  ],
}
