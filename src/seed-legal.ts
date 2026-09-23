import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding Contact, Privacy, and Terms Page Data...')

  try {
    // 1. Seed Contact Page Settings
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        heroTitle: "DON'T SETTLE FOR ORDINARY. LET'S CHAT.",
        heroTagline: "Partner with us for marketing that breaks through the noise.",
        whatsappNumber: "919876543210",
        email: "hello@webrandmedia.com",
        phone: "+91 98765 43210",
        address: "123 Creative Studio, Suite 100, Chennai, Tamil Nadu, India",
        officeHours: "Mon - Fri: 9:00 AM - 6:00 PM"
      }
    })
    console.log('✅ Contact Page settings seeded.')

    // 2. Seed Privacy Page Settings
    await payload.updateGlobal({
      slug: 'privacy-page',
      data: {
        title: 'Privacy Policy',
        subtitle: 'At We Brand Media, transparency and client data protection are paramount. Learn how we collect, safeguard, and process your information.',
        lastUpdated: 'Last Updated: July 2026',
        sections: [
          {
            anchor: 'overview',
            title: '1. Overview',
            content: 'We Brand Media ("We Brand", "we", "us", or "our") operates as a digital branding and web engineering agency based in Coimbatore, Tamil Nadu. This Privacy Policy outlines our standards and practices for managing personal and business data across our website and client services.'
          },
          {
            anchor: 'data-collection',
            title: '2. Information We Collect',
            content: 'We may collect information directly from you when you submit project inquiries, book consultations, or subscribe to our agency newsletter:\n\n- Contact Identifiers: Name, professional email address, phone number, and company name.\n- Project Requirements: Project scope briefs, budget ranges, and strategic requirements submitted via our contact form.\n- Technical Telemetry: IP addresses, browser types, device specifications, and page analytics collected via automated server logs.'
          },
          {
            anchor: 'data-usage',
            title: '3. How We Use Your Data',
            content: 'Collected information is strictly utilized to deliver high-quality agency services and improve site user experience:\n\n- Formulating project proposals, technical estimates, and service contracts.\n- Communicating ongoing development milestones and support updates.\n- Analyzing site traffic metrics to optimize performance and UI responsiveness.'
          },
          {
            anchor: 'cookies',
            title: '4. Cookies & Web Analytics',
            content: 'Our platform utilizes essential cookies and privacy-respecting analytics tools to examine visitor interactions. You can modify your browser settings at any time to reject non-essential cookies without affecting your access to our website.'
          },
          {
            anchor: 'data-security',
            title: '5. Data Protection & Security',
            content: 'We implement industry-standard encryption protocols (HTTPS/SSL), secure cloud infrastructure, and strict role-based access control measures to prevent unauthorized data access, disclosure, or alteration.'
          },
          {
            anchor: 'client-rights',
            title: '6. Your Data Rights',
            content: 'You retain full ownership of your business data. You have the right to request access to, correction of, or permanent deletion of your personal records stored in our agency databases at any time.'
          },
          {
            anchor: 'contact-legal',
            title: '7. Contact Our Data Office',
            content: 'For any privacy inquiries, data deletion requests, or legal notices, please reach out to our team:\n\nWe Brand Media Privacy Desk\nCoimbatore, Tamil Nadu, India\nEmail: privacy@webrandmedia.com\nPhone: +91 98765 43210'
          }
        ]
      }
    })
    console.log('✅ Privacy Page settings seeded.')

    // 3. Seed Terms Page Settings
    await payload.updateGlobal({
      slug: 'terms-page',
      data: {
        title: 'Terms of Service',
        subtitle: 'These terms govern all client engagements, website platform usage, and service agreements executed with We Brand Media.',
        effectiveDate: 'Effective Date: July 2026',
        sections: [
          {
            anchor: 'acceptance',
            title: '1. Acceptance of Terms',
            content: 'By commissioning project work, entering a service contract, or utilizing the digital platforms of We Brand Media ("We Brand", "Agency"), you agree to be legally bound by these Terms of Service.'
          },
          {
            anchor: 'services-scope',
            title: '2. Services & Project Deliverables',
            content: 'All creative branding, Next.js web engineering, mobile UI design, and marketing campaigns are defined in individual Statement of Work (SOW) documents signed prior to project kickoff. Scope additions outside the SOW will be billed at standard hourly agency rates.'
          },
          {
            anchor: 'intellectual-property',
            title: '3. Intellectual Property Rights',
            content: 'Upon final contract completion and receipt of full payment, all custom design source files, website code repositories, and brand identity assets become the sole property of the Client. We Brand retains non-exclusive rights to feature completed deliverables in our promotional agency portfolio.'
          },
          {
            anchor: 'payment-terms',
            title: '4. Payment Terms & Billing',
            content: 'Unless specified otherwise in an executed contract, standard billing schedules require:\n\n- 50% Initial Deposit: Required upon contract execution prior to project onboarding.\n- 50% Final Payment: Due prior to final code deployment, domain launch, or source handoff.\n- Invoices unpaid past 30 days are subject to a 1.5% late payment fee per month.'
          },
          {
            anchor: 'confidentiality',
            title: '5. Mutual Confidentiality',
            content: 'Both We Brand and Client agree to protect non-public business strategies, trade secrets, data schemas, and proprietary assets disclosed during the project lifecycle with strict confidentiality.'
          },
          {
            anchor: 'limitation',
            title: '6. Limitation of Liability',
            content: 'In no event shall We Brand Media be liable for indirect, incidental, or consequential damages arising from site hosting downtime, third-party API outages, or Client-managed code alterations. Total liability is limited strictly to the total fees paid by Client for the specific project.'
          },
          {
            anchor: 'governing-law',
            title: '7. Governing Law & Dispute Resolution',
            content: 'These terms are governed by and construed in accordance with the laws of Tamil Nadu, India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Coimbatore, India.'
          }
        ]
      }
    })
    console.log('✅ Terms Page settings seeded.')

  } catch (err) {
    console.error('Error seeding data:', err)
  }

  process.exit(0)
}

seed()
