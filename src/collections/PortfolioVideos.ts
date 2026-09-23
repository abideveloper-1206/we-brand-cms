import { CollectionConfig } from 'payload'

export const PortfolioVideos: CollectionConfig = {
  slug: 'portfolio-videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'videoType', 'order'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video Title',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Video Thumbnail / Poster Image',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
      },
    },
    {
      name: 'videoType',
      type: 'select',
      required: true,
      defaultValue: 'file',
      options: [
        { label: 'Upload MP4 File', value: 'file' },
        { label: 'External MP4 URL', value: 'url' },
      ],
      label: 'Video Source Type',
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Video File',
      admin: {
        components: {
          Field: '@/components/fields/CustomUploadField',
        },
        condition: (data) => data?.videoType === 'file',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'External Video URL (e.g., https://example.com/video.mp4)',
      admin: {
        condition: (data) => data?.videoType === 'url',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
