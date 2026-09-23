import { GlobalConfig } from 'payload'

export const TermsPage: GlobalConfig = {
  slug: 'terms-page',
  label: 'Terms Page Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      defaultValue: 'Terms of Service',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Subtitle',
      defaultValue: 'These terms govern all client engagements, website platform usage, and service agreements executed with We Brand Media.',
    },
    {
      name: 'effectiveDate',
      type: 'text',
      required: true,
      label: 'Effective Date Text',
      defaultValue: 'Effective Date: July 2026',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Terms Sections',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'anchor',
          type: 'text',
          required: true,
          label: 'Anchor ID (e.g. acceptance, payment-terms)',
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
