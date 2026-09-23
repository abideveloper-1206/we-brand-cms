'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConfig } from '@payloadcms/ui'
import { GlobalSkeleton } from './GlobalSkeleton'

interface Props {
  collectionSlug: string
}

/**
 * SingletonRedirect — used as a custom List component for "singleton" collections
 * (collections that should only ever have ONE document).
 *
 * Behaviour:
 *  • Fetches the first document of the collection via REST API
 *  • If a document exists → redirect to /admin/collections/<slug>/<id>
 *  • If no document exists → show a "Create" button that creates a blank doc
 *    and then redirects to its edit page
 */
export const SingletonRedirect: React.FC<Props> = ({ collectionSlug }) => {
  const { config } = useConfig()
  const router = useRouter()
  const adminRoute = config.routes.admin
  const [status, setStatus] = useState<'loading' | 'creating' | 'no-doc'>('loading')

  useEffect(() => {
    let cancelled = false

    const redirect = async () => {
      try {
        const res = await fetch(`/api/${collectionSlug}?limit=1&depth=0`)
        const json = await res.json()

        if (cancelled) return

        if (json?.docs?.length > 0) {
          // Document exists — go straight to its edit page
          router.replace(`${adminRoute}/collections/${collectionSlug}/${json.docs[0].id}`)
        } else {
          // No document yet — let user see the Create button
          setStatus('no-doc')
        }
      } catch {
        if (!cancelled) setStatus('no-doc')
      }
    }

    redirect()
    return () => { cancelled = true }
  }, [collectionSlug, adminRoute, router])

  const handleCreate = async () => {
    setStatus('creating')
    try {
      const res = await fetch(`/api/${collectionSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const json = await res.json()
      const id = json?.doc?.id
      if (id) {
        router.replace(`${adminRoute}/collections/${collectionSlug}/${id}`)
      } else {
        setStatus('no-doc')
      }
    } catch {
      setStatus('no-doc')
    }
  }

  if (status === 'loading') {
    return <GlobalSkeleton message="Loading..." />
  }

  if (status === 'creating') {
    return <GlobalSkeleton message="Creating document..." />
  }

  // status === 'no-doc'
  return (
    <div style={containerStyle}>
      <div style={{
        textAlign: 'center',
        background: 'white',
        borderRadius: '16px',
        padding: '48px 40px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        maxWidth: '420px',
        width: '100%',
      }}>
        {/* Empty state icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(93, 156, 69, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5d9c45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>

        <h2 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.3rem', margin: '0 0 8px' }}>
          No content yet
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 28px', lineHeight: 1.5 }}>
          There are no documents in this section. Create one to get started.
        </p>

        <button
          onClick={handleCreate}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #5d9c45 0%, #4a8635 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(93, 156, 69, 0.35)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(93, 156, 69, 0.45)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(93, 156, 69, 0.35)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create
        </button>
      </div>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '40px',
}



// ---- Per-collection wrappers (one per singleton) ----

export const AboutUsListView: React.FC = () => <SingletonRedirect collectionSlug="about-us" />
export const WhatWeBelieveListView: React.FC = () => <SingletonRedirect collectionSlug="what-we-believe" />
export const FourPillarsListView: React.FC = () => <SingletonRedirect collectionSlug="four-pillars" />
export const AboutUsStatsListView: React.FC = () => <SingletonRedirect collectionSlug="about-us-stats" />
export const OurIngredientsListView: React.FC = () => <SingletonRedirect collectionSlug="our-ingredients" />
export const OurFoundationListView: React.FC = () => <SingletonRedirect collectionSlug="our-foundation" />
export const TheRangeListView: React.FC = () => <SingletonRedirect collectionSlug="the-range" />
export const JoinTheSurgeListView: React.FC = () => <SingletonRedirect collectionSlug="join-the-surge" />
export const FooterListView: React.FC = () => <SingletonRedirect collectionSlug="footer" />
export const HeaderListView: React.FC = () => <SingletonRedirect collectionSlug="header" />
export const PartnerWithNessListView: React.FC = () => <SingletonRedirect collectionSlug="partner-with-ness" />
export const PartnerWithNessServiceModelsListView: React.FC = () => <SingletonRedirect collectionSlug="partner-with-ness-service-models" />
export const PartnerWithNessCustomizationListView: React.FC = () => <SingletonRedirect collectionSlug="partner-with-ness-customization" />
export const WhyPartnersChooseNessListView: React.FC = () => <SingletonRedirect collectionSlug="why-partners-choose-ness" />
export const BulkOrdersContentListView: React.FC = () => <SingletonRedirect collectionSlug="bulk-orders-content" />
export const MembersHeroListView: React.FC = () => <SingletonRedirect collectionSlug="members-hero" />
export const MembersWhyJoinListView: React.FC = () => <SingletonRedirect collectionSlug="members-why-join" />
export const MembersDailyFreshnessListView: React.FC = () => <SingletonRedirect collectionSlug="members-daily-freshness" />
export const MembersBringFreshnessListView: React.FC = () => <SingletonRedirect collectionSlug="members-bring-freshness" />
export const MembersHowItWorksListView: React.FC = () => <SingletonRedirect collectionSlug="members-how-it-works" />
export const MembersSignUpListView: React.FC = () => <SingletonRedirect collectionSlug="members-sign-up" />
export const ContactContentListView: React.FC = () => <SingletonRedirect collectionSlug="contact-content" />
export const FAQHeroProductListView: React.FC = () => <SingletonRedirect collectionSlug="faq-hero-product" />
export const FAQHealthNutritionListView: React.FC = () => <SingletonRedirect collectionSlug="faq-health-nutrition" />
export const PrivacyPolicyListView: React.FC = () => <SingletonRedirect collectionSlug="privacy-policy" />
export const TermsOfServiceListView: React.FC = () => <SingletonRedirect collectionSlug="terms-of-service" />
export const FaqNeedMoreHelpListView: React.FC = () => <SingletonRedirect collectionSlug="faq-need-more-help" />
export const HomeHeroSectionListView: React.FC = () => <SingletonRedirect collectionSlug="home-hero-section" />
export const HomeStoryFavoritesListView: React.FC = () => <SingletonRedirect collectionSlug="home-story-favorites" />
export const HomeProductsPartnershipsListView: React.FC = () => (<SingletonRedirect collectionSlug="home-products-partnerships" />)
export const KeyFeaturesListView: React.FC = () => <SingletonRedirect collectionSlug="key-features" />

