import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Home } from './globals/Home'
import { About } from './globals/About'
import { Portfolio } from './globals/Portfolio'
import { Projects } from './collections/Projects'
import { PortfolioVideos } from './collections/PortfolioVideos'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Services } from './collections/Services'
import { ContactPage } from './globals/ContactPage'
import { PrivacyPage } from './globals/PrivacyPage'
import { TermsPage } from './globals/TermsPage'
import { ServicesPage } from './globals/ServicesPage'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: '*',
  admin: {
    meta: {
      titleSuffix: '- We Brand Media',
      description: "We Brand Media is a creative branding and digital marketing agency based in Coimbatore, helping startups, local businesses, entrepreneurs, educational institutions, and growing brands build a strong digital presence.",
      icons: [
        {
          rel: 'icon',
          type: 'image/webp',
          url: '/favicon.webp',
        },
      ],
    },
    user: Users.slug,
    components: {
      Nav: '@/components/Admin/CustomNav#CustomNav',
      header: ['@/components/Admin/CustomHeader#CustomHeader'],
      beforeLogin: ['@/components/Admin/BeforeLogin#BeforeLogin'],
      graphics: {
        Logo: '@/components/Logo#Logo',
        Icon: '@/components/Logo#Icon',
      },
      views: {
        dashboard: {
          Component: '@/components/Admin/DashboardRedirect#DashboardRedirect',
        },
        account: {
          Component: '@/components/Admin/CustomAccountView#CustomAccountView',
        },
      },
    },

    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Projects, PortfolioVideos, ContactSubmissions, Services],
  globals: [Header, Footer, Home, About, Portfolio, ContactPage, PrivacyPage, TermsPage, ServicesPage],
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || 'hello@webrandmedia.com',
    defaultFromName: 'We Brand',
    transportOptions: {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
   plugins: [
    ...(process.env.AWS_REGION ? [
      s3Storage({
        collections: {
          media: true,
        },
        bucket: process.env.AWS_BUCKET_NAME as string,
        config: {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
          },
          region: process.env.AWS_REGION,
        },
      })
    ] : [])
  ],
})
