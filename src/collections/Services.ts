import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL path segment)',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description (Card/Hero)',
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      required: true,
      label: 'Full Description (Detail Page)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Service Image',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
      },
    },
    {
      name: 'accent',
      type: 'text',
      required: true,
      defaultValue: '#2563c9',
      label: 'Accent Color (Hex)',
    },
    {
      name: 'tint',
      type: 'text',
      required: true,
      defaultValue: '#e8f0ff',
      label: 'Tint Color (Hex)',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      label: 'Service Features',
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Feature text',
        }
      ]
    },
    {
      name: 'overviewImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Overview / Secondary Image',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
      },
    },
    {
      name: 'workflowSteps',
      type: 'array',
      label: 'Workflow Steps',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Step Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Step Image',
          admin: {
            components: {
              Field: '@/components/fields/CustomUploadField',
            },
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    }
  ],
}
