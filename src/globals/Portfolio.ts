import { GlobalConfig } from 'payload'

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  label: 'Portfolio Page Settings',
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title1',
          type: 'text',
          label: 'Title Line 1',
          defaultValue: 'Crafting Digital',
        },
        {
          name: 'title2',
          type: 'text',
          label: 'Title Line 2',
          defaultValue: 'Legacies.',
        },
        {
          name: 'tagline',
          type: 'textarea',
          label: 'Tagline',
          defaultValue: 'Explore our curated gallery of market-dominating brand identities, Next.js web platforms, mobile products, and high-octane creative campaigns.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Featured Image',
          admin: {
            components: {
              Field: '@/components/fields/CustomUploadField',
            },
          },
        },
        {
          name: 'badgeNum',
          type: 'text',
          label: 'Badge Number',
          defaultValue: '50+',
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
          defaultValue: 'Flagship Projects Delivered',
        },
      ],
    },
    {
      name: 'zoomSection',
      type: 'group',
      label: 'Scroll Zoom Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow',
          defaultValue: 'Scroll Down to Unfold Showcase',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Zoom Image',
          admin: {
            components: {
              Field: '@/components/fields/CustomUploadField',
            },
          },
        },
        {
          name: 'badgeTag',
          type: 'text',
          label: 'Badge Tag',
          defaultValue: 'FLAGSHIP SHOWCASE',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'AURA PARIS — LUXURY DIGITAL EDITORIAL',
        },
      ],
    },
    {
      name: 'portfolioStack',
      type: 'group',
      label: 'Floating Portfolio Stack (Projects List)',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow',
          defaultValue: 'Curated Portfolio',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Masterpieces Engineered for Growth.',
        },
      ],
    },
    {
      name: 'videoSection',
      type: 'group',
      label: 'Video Ticker Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'More than 50,000+ Official Selections',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtitle',
          defaultValue: 'Enabling brands to achieve their dream growth and lead successful digital transformations.',
        },
      ],
    },
  ],
}
