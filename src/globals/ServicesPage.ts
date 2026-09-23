import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'titleLine1', type: 'text', required: true, defaultValue: 'Elevate Your' },
        { name: 'titleLine2', type: 'text', required: true, defaultValue: 'Brand.' },
        { name: 'tagline', type: 'textarea', required: true, defaultValue: 'From bold branding to scalable web development and data-driven marketing, we provide end-to-end digital solutions that drive real growth.' },
        { name: 'badgeNumber', type: 'text', required: true, defaultValue: '8+' },
        { name: 'badgeText', type: 'text', required: true, defaultValue: 'Core Digital Services' },
      ],
    },
    {
      name: 'listSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, defaultValue: 'Our Services' },
        { name: 'title', type: 'text', required: true, defaultValue: 'Comprehensive Digital Solutions.' },
      ],
    },
    {
      name: 'processSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, defaultValue: 'How We Work' },
        { name: 'title', type: 'text', required: true, defaultValue: 'Our Proven Process.' },
        {
          name: 'steps',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'stepNumber', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'contactCallout',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Ready to transform your brand into a digital powerhouse?' },
        { name: 'description', type: 'textarea', required: true, defaultValue: 'Connect with our creative strategists today and let\'s craft something unforgettable.' },
        { name: 'buttonText', type: 'text', required: true, defaultValue: 'Get In Touch' },
        { name: 'buttonUrl', type: 'text', required: true, defaultValue: '/contact-us' },
      ],
    },
  ],
}
