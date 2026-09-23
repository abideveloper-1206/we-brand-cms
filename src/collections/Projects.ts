import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'client'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Branding', value: 'Branding' },
        { label: 'Web Development', value: 'Web Development' },
        { label: 'Mobile Apps', value: 'Mobile Apps' },
        { label: 'UI/UX Design', value: 'UI/UX Design' },
      ],
      label: 'Category',
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      label: 'Year',
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Image',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
      },
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      label: 'Badge Tag (e.g., Brand Identity & E-Commerce)',
    },
    {
      name: 'desc',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'projectLink',
      type: 'text',
      required: false,
      label: 'Project Link URL (e.g. https://example.com)',
      admin: {
        description: 'The URL the "Explore Project" button will link to. Leave empty to link to the Contact page.',
      },
    },
  ],
}
