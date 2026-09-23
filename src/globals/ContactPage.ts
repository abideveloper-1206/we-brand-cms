import { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      label: 'Hero Title',
      defaultValue: "DON'T SETTLE FOR ORDINARY. LET'S CHAT.",
    },
    {
      name: 'heroTagline',
      type: 'text',
      required: true,
      label: 'Hero Tagline',
      defaultValue: 'Partner with us for marketing that breaks through the noise.',
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
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      label: 'WhatsApp Contact Number (with country code)',
      defaultValue: '919876543210',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Contact Email',
      defaultValue: 'hello@webrandmedia.com',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Contact Phone Number',
      defaultValue: '+91 98765 43210',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Office Address',
      defaultValue: '123 Creative Studio, Suite 100, Chennai, Tamil Nadu, India',
    },
    {
      name: 'officeHours',
      type: 'text',
      label: 'Office Hours',
      defaultValue: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
  ],
}
