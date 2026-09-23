import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  access: {
    read: () => true, // Publicly accessible
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'hero',
              label: 'Hero Fields',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Who We Are.',
                },
                {
                  name: 'tagline',
                  type: 'textarea',
                  defaultValue: 'We are a high-octane team of designers, engineers, and digital marketers based in Coimbatore, transforming ambitious ideas into market-dominating brand experiences.',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    components: {
                      Field: '@/components/fields/CustomUploadField',
                    },
                  },
                },
                {
                  name: 'badgeNum',
                  label: 'Badge Number',
                  type: 'text',
                  defaultValue: '500+',
                },
                {
                  name: 'badgeText',
                  label: 'Badge Text',
                  type: 'text',
                  defaultValue: 'Brands Scaled Nationwide',
                },
              ],
            },
          ],
        },
        {
          label: 'Metrics Ticker',
          fields: [
            {
              name: 'ticker',
              label: 'Ticker Items',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Philosophy',
          fields: [
            {
              name: 'philosophy',
              label: 'Philosophy Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Our Philosophy',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Driven by Innovation, Defined by Impact.',
                },
                {
                  name: 'cards',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'chip',
                      label: 'Number/Chip (e.g. #01)',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'desc',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Timeline',
          fields: [
            {
              name: 'timeline',
              label: 'Timeline Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Our Growth Trajectory',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'The Journey of We Brand.',
                },
                {
                  name: 'items',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'year',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'desc',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'stats',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'chip',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Team',
          fields: [
            {
              name: 'team',
              label: 'Team Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Creative Minds',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'The Masterminds Behind We Brand.',
                },
                {
                  name: 'members',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        components: {
                          Field: '@/components/fields/CustomUploadField',
                        },
                      },
                    },
                    {
                      name: 'role',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'bio',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact CTA',
          fields: [
            {
              name: 'contactCta',
              label: 'Contact Call-to-Action',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Ready to transform your brand into a digital powerhouse?',
                },
                {
                  name: 'desc',
                  type: 'textarea',
                  defaultValue: 'Connect with our creative strategists today and let\'s craft something unforgettable.',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  defaultValue: 'Get In Touch',
                },
                {
                  name: 'buttonUrl',
                  type: 'text',
                  defaultValue: '/contact-us',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
