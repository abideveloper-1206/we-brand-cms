import { GlobalConfig } from 'payload'

export const PrivacyPage: GlobalConfig = {
  slug: 'privacy-page',
  label: 'Privacy Page Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      defaultValue: 'Privacy Policy',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Subtitle',
      defaultValue: 'At We Brand Media, transparency and client data protection are paramount. Learn how we collect, safeguard, and process your information.',
    },
    {
      name: 'lastUpdated',
      type: 'text',
      required: true,
      label: 'Last Updated Date Text',
      defaultValue: 'Last Updated: July 2026',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Policy Sections',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'anchor',
          type: 'text',
          required: true,
          label: 'Anchor ID (e.g. overview, data-collection)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Section Title',
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          label: 'Section Content',
        },
      ],
    },
  ],
}
