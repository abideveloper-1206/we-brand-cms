import { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'service', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit
    read: ({ req }) => Boolean(req.user), // Only logged-in admin can read
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'org',
      type: 'text',
      required: true,
      label: 'Organization Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Contact Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'service',
      type: 'select',
      required: true,
      options: [
        { label: 'Web Design & Dev', value: 'web' },
        { label: 'SEO & Marketing', value: 'seo' },
        { label: 'Branding', value: 'branding' },
      ],
      label: 'Looking For',
    },
    {
      name: 'budget',
      type: 'select',
      required: true,
      options: [
        { label: 'Below ₹50k', value: 'sm' },
        { label: '₹50k - ₹1.5L', value: 'md' },
        { label: '₹1.5L+', value: 'lg' },
      ],
      label: 'Project Budget',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
    },
  ],
}
