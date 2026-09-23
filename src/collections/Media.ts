import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
    admin: {
    hidden: false, 
  },
    access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 's3Url',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: true,

  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        const bucket = process.env.AWS_BUCKET_NAME
        const region = process.env.AWS_REGION

        const filename = data.filename || originalDoc?.filename

        if (filename && bucket && region) {
          data.s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
        } else {
          data.s3Url = null
        }

        return data
      },
    ],
  },
}
