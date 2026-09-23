import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page Settings',
  access: {
    read: () => true,
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
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue: 'Best-in-class local\nbenefits for everyone, everywhere',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Design Agency.',
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Floating Images (Exactly 6)',
                  minRows: 6,
                  maxRows: 6,
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
                  ],
                },
                {
                  name: 'avatars',
                  type: 'array',
                  label: 'Avatars (Exactly 4)',
                  minRows: 4,
                  maxRows: 4,
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
                  ],
                },
                {
                  name: 'statsCount',
                  type: 'text',
                  defaultValue: '2500+',
                },
                {
                  name: 'statsText',
                  type: 'text',
                  defaultValue: 'Engaged and counting',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  defaultValue: 'Explore Our Projects',
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  defaultValue: '#portfolio',
                },
              ],
            },
          ],
        },
        {
          label: 'Stats Section',
          fields: [
            {
              name: 'stats',
              label: 'Stats Fields',
              type: 'group',
              fields: [
                {
                  name: 'bgImage',
                  label: 'Background Image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    components: {
                      Field: '@/components/fields/CustomUploadField',
                    },
                  },
                },
                {
                  name: 'items',
                  label: 'Stats Columns',
                  type: 'array',
                  minRows: 3,
                  maxRows: 3,
                  fields: [
                    {
                      name: 'number',
                      type: 'number',
                      required: true,
                    },
                    {
                      name: 'suffix',
                      type: 'text',
                      defaultValue: '+',
                    },
                    {
                      name: 'label',
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
          label: 'About Section',
          fields: [
            {
              name: 'about',
              label: 'About (Trust) Fields',
              type: 'group',
              fields: [
                {
                  name: 'leftBadge',
                  label: 'Left Percent Badge',
                  type: 'group',
                  fields: [
                    {
                      name: 'percent',
                      type: 'text',
                      defaultValue: '100%',
                    },
                    {
                      name: 'caption',
                      type: 'text',
                      defaultValue: 'Creative strategies tailored to your brand',
                    },
                  ],
                },
                {
                  name: 'rightCard',
                  label: 'Right Info Card',
                  type: 'group',
                  fields: [
                    {
                      name: 'badge',
                      type: 'text',
                      defaultValue: '#01',
                    },
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Your Trusted Digital Marketing Agency',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      defaultValue: 'We Brand Media is a creative branding and digital marketing agency based in Coimbatore, helping startups, local businesses, entrepreneurs, educational institutions, and growing brands build a strong digital presence.',
                    },
                  ],
                },
                {
                  name: 'carousel',
                  label: 'About Slide Carousel',
                  type: 'array',
                  fields: [
                    {
                      name: 'word1',
                      type: 'text',
                      defaultValue: 'Impactful',
                      required: true,
                    },
                    {
                      name: 'word2',
                      type: 'text',
                      defaultValue: 'Creative',
                      required: true,
                    },
                    {
                      name: 'word3',
                      type: 'text',
                      defaultValue: 'Modern',
                      required: true,
                    },
                    {
                      name: 'word4',
                      type: 'text',
                      defaultValue: 'Design',
                      required: true,
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
                      name: 'locationName',
                      label: 'Location Name',
                      type: 'text',
                      defaultValue: 'Coimbatore',
                    },
                    {
                      name: 'locationRole',
                      label: 'Location Details/Role',
                      type: 'text',
                      defaultValue: 'Tamil Nadu, India',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact Banner',
          fields: [
            {
              name: 'contactBanner',
              label: 'Contact Banner Fields',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: "We're getting a feeling you like us already!",
                },
                {
                  name: 'subtext',
                  type: 'textarea',
                  defaultValue: "Our doors (and video call links!) are open. Choose the way you'd like to chat, and we'll be there!",
                },
                {
                  name: 'ctaText',
                  label: 'Button Text',
                  type: 'text',
                  defaultValue: 'Contact us.',
                },
                {
                  name: 'ctaUrl',
                  label: 'Button URL',
                  type: 'text',
                  defaultValue: '/contact-us',
                },
              ],
            },
          ],
        },
        {
          label: 'Our Expertise',
          fields: [
            {
              name: 'expertise',
              label: 'Expertise Section Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  label: 'Eyebrow Label',
                  type: 'text',
                  defaultValue: 'Our Expertise',
                },
                {
                  name: 'heading',
                  label: 'Section Heading',
                  type: 'text',
                  defaultValue: 'Assuring seamless Digital Marketing & Brand Building solutions',
                },
                {
                  name: 'headingHighlight',
                  label: 'Heading Highlighted Text',
                  type: 'text',
                  defaultValue: 'Digital Marketing & Brand Building',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: 'With over a decade of experience, we have served 250+ brands across 10+ countries and delivered 350+ projects — consistently helping our clients hit (and exceed) their brand marketing goals.',
                },
                {
                  name: 'tabs',
                  label: 'Service Tabs',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'tabId',
                      label: 'Tab ID (unique key)',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'label',
                      label: 'Tab Label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'image',
                      label: 'Tab Image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        components: {
                          Field: '@/components/fields/CustomUploadField',
                        },
                      },
                    },
                    {
                      name: 'imageAlt',
                      label: 'Image Alt Text',
                      type: 'text',
                    },
                    {
                      name: 'visualText',
                      label: 'Tab Description Text',
                      type: 'textarea',
                      defaultValue: 'We craft brand identities that speak your story — visually, emotionally, and memorably.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Transforming Ideas',
          fields: [
            {
              name: 'portfolio',
              label: 'Transforming Ideas (Portfolio) Fields',
              type: 'group',
              fields: [
                {
                  name: 'iconImage',
                  label: 'Small Icon Image (top-left)',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    components: {
                      Field: '@/components/fields/CustomUploadField',
                    },
                  },
                },
                {
                  name: 'title',
                  label: 'Main Title',
                  type: 'textarea',
                  defaultValue: 'Transforming Ideas\nInto Digital\nExperiences',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: 'Every project reflects our commitment to creativity, innovation, and measurable business results.',
                },
                {
                  name: 'cards',
                  label: 'Portfolio Cards',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'image',
                      label: 'Card Image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        components: {
                          Field: '@/components/fields/CustomUploadField',
                        },
                      },
                    },
                    {
                      name: 'imageAlt',
                      label: 'Image Alt Text',
                      type: 'text',
                    },
                    {
                      name: 'cardTitle',
                      label: 'Card Title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'cardDesc',
                      label: 'Card Description',
                      type: 'text',
                    },
                    {
                      name: 'style',
                      label: 'Caption Style',
                      type: 'select',
                      defaultValue: 'clay',
                      options: [
                        { label: 'Clay (dark)', value: 'clay' },
                        { label: 'Blue', value: 'blue' },
                        { label: 'White', value: 'white' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChoose',
              label: 'Why Choose Us Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Why choose us',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Why Choose We Brand Media',
                },
                {
                  name: 'items',
                  label: 'Feature Items',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'val',
                      label: 'Value / Title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'lbl',
                      label: 'Description Label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'icon',
                      label: 'Icon (Upload SVG / Image)',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        components: {
                          Field: '@/components/fields/CustomUploadField',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              label: 'Testimonials Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'What clients say',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Trusted by Growing Brands',
                },
                {
                  name: 'items',
                  label: 'Testimonial Cards',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'quote',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'role',
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
          label: 'Workflow Process',
          fields: [
            {
              name: 'workflow',
              label: 'Workflow Process Fields',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'How We Build Your Success',
                },
                {
                  name: 'tabs',
                  label: 'Workflow Tabs',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'tabName',
                      label: 'Tab Name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'steps',
                      label: 'Workflow Steps',
                      type: 'array',
                      minRows: 1,
                      fields: [
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
                          name: 'image',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            components: {
                              Field: '@/components/fields/CustomUploadField',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services Section',
          fields: [
            {
              name: 'servicesSection',
              label: 'Services Section Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Our Services',
                },
                {
                  name: 'titleLine1',
                  type: 'text',
                  defaultValue: 'Complete Digital Solutions',
                },
                {
                  name: 'titleLine2',
                  type: 'text',
                  defaultValue: 'Under One Roof',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ Section',
          fields: [
            {
              name: 'faq',
              label: 'FAQ Section Fields',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  label: 'Eyebrow Label',
                  type: 'text',
                  defaultValue: 'Got Questions?',
                },
                {
                  name: 'title',
                  label: 'Section Title',
                  type: 'text',
                  defaultValue: 'Frequently Asked Questions',
                },
                {
                  name: 'items',
                  label: 'FAQ Items',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'question',
                      label: 'Question',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'answer',
                      label: 'Answer',
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
          label: 'Pre-Footer CTA',
          fields: [
            {
              name: 'preFooterCta',
              label: 'Pre-Footer Call-to-Action',
              type: 'group',
              fields: [
                {
                  name: 'line1',
                  label: 'Headline Line 1',
                  type: 'text',
                  defaultValue: 'IDEA?',
                },
                {
                  name: 'line2',
                  label: 'Headline Line 2',
                  type: 'text',
                  defaultValue: 'STOP THINKING.',
                },
                {
                  name: 'line3',
                  label: 'Headline Line 3',
                  type: 'text',
                  defaultValue: 'START GROWING',
                },
                {
                  name: 'buttonText',
                  label: 'Button Text',
                  type: 'text',
                  defaultValue: 'Contact Us',
                },
                {
                  name: 'buttonUrl',
                  label: 'Button URL',
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
