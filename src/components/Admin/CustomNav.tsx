'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useConfig, useAuth } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import {
  Handshake, Image as ImageIcon, Briefcase, Settings, Star,
  Package, Truck, FileText, ClipboardList,
  HelpCircle, MessageSquare, Heart, LifeBuoy,
  Home, BookOpen, Layers, Tags,
  Crown, UserPlus, Sun, Leaf, Cog, Users,
  Phone, Inbox, Info, Target, LayoutGrid, BarChart2,
  FlaskConical, Building, Zap, Scale, ShieldCheck,
  FileSignature, PanelTop, PanelBottom, Maximize,
  LogOut, User, ChevronDown, Video
} from 'lucide-react'

export const CustomNav: React.FC = () => {
  const { config } = useConfig()
  const { user, logOut } = useAuth()
  const pathname = usePathname()
  // State hooks moved down to initialize based on active status

  const {
    routes: { admin: adminRoute },
  } = config

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const confirmLogout = async () => {
    await logOut()
    window.location.href = `${adminRoute}/login`
  }

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  const aboutUsHref = `${adminRoute}/collections/about-us`
  // 1. New link for What We Believe
  const whatWeBelieveHref = `${adminRoute}/collections/what-we-believe`
  const fourPillarsHref = `${adminRoute}/collections/four-pillars`
  const aboutUsStatsHref = `${adminRoute}/collections/about-us-stats`
  const ourIngredientsHref = `${adminRoute}/collections/our-ingredients`
  const ourFoundationHref = `${adminRoute}/collections/our-foundation`
  const joinTheSurgeHref = `${adminRoute}/collections/join-the-surge`
  const footerMainHref = `${adminRoute}/globals/footer`
  const headerMainHref = `${adminRoute}/globals/header`
  const homeMainHref = `${adminRoute}/globals/home`
  const aboutMainHref = `${adminRoute}/globals/about`
  const portfolioMainHref = `${adminRoute}/globals/portfolio`
  const projectsHref = `${adminRoute}/collections/projects`
  const portfolioVideosHref = `${adminRoute}/collections/portfolio-videos`
  const servicesHref = `${adminRoute}/collections/services`
  const servicesPageHref = `${adminRoute}/globals/services-page`
  
  const footerActive = isActive(footerMainHref)
  const headerActive = isActive(headerMainHref)
  const homeActive = isActive(homeMainHref)
  const aboutActive = isActive(aboutMainHref)
  const portfolioActive = isActive(portfolioMainHref)
  const projectsActive = isActive(projectsHref)
  const portfolioVideosActive = isActive(portfolioVideosHref)
  const servicesActive = isActive(servicesHref)
  const servicesPageActive = isActive(servicesPageHref)
  
  const contactPageHref = `${adminRoute}/globals/contact-page`
  const privacyPageHref = `${adminRoute}/globals/privacy-page`
  const termsPageHref = `${adminRoute}/globals/terms-page`
  
  const contactPageActive = isActive(contactPageHref)
  const privacyPageActive = isActive(privacyPageHref)
  const termsPageActive = isActive(termsPageHref)
  const theRangeHref = `${adminRoute}/collections/the-range`
  const partnerWithNessHref = `${adminRoute}/collections/partner-with-ness`
  const partnerWithNessServiceModelsHref = `${adminRoute}/collections/partner-with-ness-service-models`
  const partnerWithNessCustomizationHref = `${adminRoute}/collections/partner-with-ness-customization`
  const whyPartnersChooseNessHref = `${adminRoute}/collections/why-partners-choose-ness`
  const productsHref = `${adminRoute}/collections/products`
  const keyFeaturesHref = `${adminRoute}/collections/key-features`
  const categoriesHref = `${adminRoute}/collections/categories`
  const productReviewsHref = `${adminRoute}/collections/product-reviews`
  const bulkOrdersContentHref = `${adminRoute}/collections/bulk-orders-content`
  const bulkOrdersFormHref = `${adminRoute}/collections/bulk-orders-form`
  const membersHeroHref = `${adminRoute}/collections/members-hero`
  const membersWhyJoinHref = `${adminRoute}/collections/members-why-join`
  const membersDailyFreshnessHref = `${adminRoute}/collections/members-daily-freshness`
  const membersBringFreshnessHref = `${adminRoute}/collections/members-bring-freshness`
  const membersHowItWorksHref = `${adminRoute}/collections/members-how-it-works`
  const membersSignUpHref = `${adminRoute}/collections/members-sign-up`
  const membersClubSignupsHref = `${adminRoute}/collections/members-club-signups`
  const contactContentHref = `${adminRoute}/collections/contact-content`
  const contactSubmissionsHref = `${adminRoute}/collections/contact-submissions`
  const faqHeroProductHref = `${adminRoute}/collections/faq-hero-product`
  const faqHealthNutritionHref = `${adminRoute}/collections/faq-health-nutrition`
  const faqNeedMoreHelpHref = `${adminRoute}/collections/faq-need-more-help`
  const pdpFaqHref = `${adminRoute}/collections/pdp-faqs`
  const blogsHref = `${adminRoute}/collections/blogs`
  const homeHeroHref = `${adminRoute}/collections/home-hero-section`
  const homeStoryFavoritesHref = `${adminRoute}/collections/home-story-favorites`
  const homeProductsPartnershipsHref = `${adminRoute}/collections/home-products-partnerships`
  const newsletterSubscribersHref = `${adminRoute}/collections/newsletter-subscribers`
  
  const aboutUsActive = isActive(aboutUsHref)

  // 2. Active status checking
  const whatWeBelieveActive = isActive(whatWeBelieveHref)
  const fourPillarsActive = isActive(fourPillarsHref)
  const aboutUsStatsActive = isActive(aboutUsStatsHref)
  const ourIngredientsActive = isActive(ourIngredientsHref)
  const ourFoundationActive = isActive(ourFoundationHref)
  const joinTheSurgeActive = isActive(joinTheSurgeHref)
  const theRangeActive = isActive(theRangeHref)
  const partnerWithNessActive = isActive(partnerWithNessHref)
  const partnerWithNessServiceModelsActive = isActive(partnerWithNessServiceModelsHref)
  const partnerWithNessCustomizationActive = isActive(partnerWithNessCustomizationHref)
  const whyPartnersChooseNessActive = isActive(whyPartnersChooseNessHref)
  const productsActive = isActive(productsHref)
  const keyFeaturesActive = isActive(keyFeaturesHref)
  const categoriesActive = isActive(categoriesHref)
  const productReviewsActive = isActive(productReviewsHref)
  const bulkOrdersContentActive = isActive(bulkOrdersContentHref)
  const bulkOrdersFormActive = isActive(bulkOrdersFormHref)
  const membersHeroActive = isActive(membersHeroHref)
  const membersWhyJoinActive = isActive(membersWhyJoinHref)
  const membersDailyFreshnessActive = isActive(membersDailyFreshnessHref)
  const membersBringFreshnessActive = isActive(membersBringFreshnessHref)
  const membersHowItWorksActive = isActive(membersHowItWorksHref)
  const membersSignUpActive = isActive(membersSignUpHref)
  const membersClubSignupsActive = isActive(membersClubSignupsHref)
  const isAnyMembersClubActive = membersHeroActive || membersWhyJoinActive || membersDailyFreshnessActive || membersBringFreshnessActive || membersHowItWorksActive || membersSignUpActive || membersClubSignupsActive

  // Parent "About Us" group will look active if either Hero Section or What We Believe is open
  const isAnyAboutUsSubMenuFinancialActive = aboutUsActive || whatWeBelieveActive || fourPillarsActive || aboutUsStatsActive || 
    ourIngredientsActive || ourFoundationActive ||
    joinTheSurgeActive

  const bulkOrdersActive =
  bulkOrdersContentActive || bulkOrdersFormActive

  

const faqHeroProductActive = isActive(faqHeroProductHref)
const faqHealthNutritionActive = isActive(faqHealthNutritionHref)
const faqNeedMoreHelpActive = isActive(faqNeedMoreHelpHref)
const pdpFaqActive = isActive(pdpFaqHref)
const blogsActive = isActive(blogsHref)

const faqActive =
  faqHeroProductActive || faqHealthNutritionActive || faqNeedMoreHelpActive || pdpFaqActive

  const homeHeroActive = isActive(homeHeroHref)
  const homeStoryFavoritesActive = isActive(homeStoryFavoritesHref)
  const homeProductsPartnershipsActive = isActive(homeProductsPartnershipsHref)
  const homePageActive = homeHeroActive || homeStoryFavoritesActive || homeProductsPartnershipsActive

  const newsletterSubscribersActive = isActive(newsletterSubscribersHref)

  const contactContentActive = isActive(contactContentHref)
  const contactSubmissionsActive = isActive(contactSubmissionsHref)
  const isAnyContactPageActive = contactContentActive || contactSubmissionsActive

  const privacyPolicyHref = `${adminRoute}/collections/privacy-policy`
  const termsOfServiceHref = `${adminRoute}/collections/terms-of-service`
  const privacyPolicyActive = isActive(privacyPolicyHref)
  const termsOfServiceActive = isActive(termsOfServiceHref)
  const isAnyLegalPageActive = privacyPolicyActive || termsOfServiceActive

  const isAnyPartnerWithNessActive = partnerWithNessActive || partnerWithNessServiceModelsActive || partnerWithNessCustomizationActive || whyPartnersChooseNessActive

  const [aboutUsOpen, setAboutUsOpen] = useState(false)
  const [partnerWithNessMenuOpen, setPartnerWithNessMenuOpen] = useState(false)
  const [bulkOrdersOpen, setBulkOrdersOpen] = useState(false)
  const [membersClubOpen, setMembersClubOpen] = useState(false)
  const [faqMenuOpen, setFaqMenuOpen] = useState(false)
  const [contactPageOpen, setContactPageOpen] = useState(false)
  const [legalPagesOpen, setLegalPagesOpen] = useState(false)
  const [homePageOpen, setHomePageOpen] = useState(false)

  useEffect(() => {
    if (isAnyAboutUsSubMenuFinancialActive) setAboutUsOpen(true)
    if (isAnyPartnerWithNessActive) setPartnerWithNessMenuOpen(true)
    if (bulkOrdersActive) setBulkOrdersOpen(true)
    if (isAnyMembersClubActive) setMembersClubOpen(true)
    if (faqActive) setFaqMenuOpen(true)
    if (isAnyContactPageActive) setContactPageOpen(true)
    if (isAnyLegalPageActive) setLegalPagesOpen(true)
  }, [
    pathname,
    isAnyAboutUsSubMenuFinancialActive,
    isAnyPartnerWithNessActive,
    bulkOrdersActive,
    isAnyMembersClubActive,
    faqActive,
    isAnyContactPageActive,
    isAnyLegalPageActive
  ])

  
interface NavItemProps {
  active: boolean;
  href: string;
  icon: React.FC<any>;
  children: React.ReactNode;
}

const NavItem = ({ active, href, icon: Icon, children }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        margin: '4px 0',
        borderRadius: '8px',
        textDecoration: 'none',
        width: '100%',
        border: 'none',
        color: '#ffffff',
        backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 500,
        boxShadow: active ? 'inset 3px 0 0 white' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      <Icon style={{ opacity: 1, width: '18px', height: '18px' }} />
      <span style={{ flex: 1, textAlign: 'left' }}>{children}</span>
    </Link>
  )
}

const NavSubItem = ({ active, href, icon: Icon, children }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px 10px 48px',
        margin: '2px 0',
        borderRadius: '8px',
        textDecoration: 'none',
        color: '#ffffff',
        backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        boxShadow: active ? 'inset 3px 0 0 white' : 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '0.82rem',
        fontWeight: active ? 600 : 400,
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      <span style={{
        position: 'absolute',
        left: '28px',
        top: '50%',
        width: '8px',
        height: '1px',
        backgroundColor: active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'
      }} />
      <Icon style={{ opacity: 1, width: '15px', height: '15px' }} />
      <span style={{ flex: 1, textAlign: 'left' }}>{children}</span>
    </Link>
  )
}

interface NavGroupProps {
  active: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  icon: React.FC<any>;
  children: React.ReactNode;
  title: string;
}

const NavGroup = ({ active, open, setOpen, icon: Icon, children, title }: NavGroupProps) => {
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          margin: '4px 0',
          borderRadius: '8px',
          width: '100%',
          border: 'none',
          background: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          color: '#ffffff',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          fontSize: '0.875rem',
          fontWeight: active ? 600 : 500,
          boxShadow: active ? 'inset 3px 0 0 white' : 'none',
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        <Icon style={{ opacity: 1, width: '18px', height: '18px' }} />
        <span style={{ flex: 1, textAlign: 'left' }}>{title}</span>
        <ChevronDown
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            opacity: 1,
            width: '16px',
            height: '16px'
          }}
        />
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '1000px' : '0px',
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
          opacity: open ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>
  )
}
  return (
    <nav
      className="custom-sidebar"
      style={{  
        background: '#0f2f63',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        height: '100vh',
        width: '270px',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <style>{`
        .nav__toggle, .nav-toggler, button[aria-label="Close menu"], button[aria-label="Open menu"], .payload-nav-toggle {
          display: none !important;
        }
      `}</style>
      
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: 800, padding: '10px 0' }}>We Brand</h1>
      </div>

      <div className="sidebar-scroll-area" style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
        <p style={{ color: 'white', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, margin: '0 0 8px 12px' }}>
          Collections
        </p>

        <NavItem active={projectsActive} href={projectsHref} icon={LayoutGrid}>Projects Collection</NavItem>
        <NavItem active={servicesActive} href={servicesHref} icon={Briefcase}>Services</NavItem>
        <NavItem active={portfolioVideosActive} href={portfolioVideosHref} icon={Video}>Portfolio Videos</NavItem>
        <NavItem active={contactSubmissionsActive} href={contactSubmissionsHref} icon={Inbox}>Form Submissions</NavItem>
        <NavItem active={homeActive} href={homeMainHref} icon={Home}>Home Page Settings</NavItem>
        <NavItem active={aboutActive} href={aboutMainHref} icon={Info}>About Us Settings</NavItem>
        <NavItem active={portfolioActive} href={portfolioMainHref} icon={ImageIcon}>Portfolio Settings</NavItem>
        <NavItem active={servicesPageActive} href={servicesPageHref} icon={Layers}>Services Page Settings</NavItem>
        <NavItem active={contactPageActive} href={contactPageHref} icon={Phone}>Contact Settings</NavItem>
        <NavItem active={privacyPageActive} href={privacyPageHref} icon={ShieldCheck}>Privacy Settings</NavItem>
        <NavItem active={termsPageActive} href={termsPageHref} icon={FileSignature}>Terms Settings</NavItem>
        <NavItem active={headerActive} href={headerMainHref} icon={PanelTop}>Header Settings</NavItem>
        <NavItem active={footerActive} href={footerMainHref} icon={PanelBottom}>Footer Settings</NavItem>

      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '2px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#2563c9', boxShadow: '0 3px 8px rgba(37, 99, 201, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
            {user?.email?.[0].toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user?.email}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#ffffff', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0px' }}>
              Administrator
            </div>
          </div>
        </div>
       
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '2px' }}>
          <Link
            href={`${adminRoute}/account`}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#ffffff',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }}
          >
            <User style={{ width: '16px', height: '16px' }} />
            Profile
          </Link>
          
          <button
            onClick={() => setShowLogoutConfirm(true)}
            style={{
              background: 'rgba(255,68,68,0.06)',
              border: '1px solid rgba(255,68,68,0.15)',
              color: '#ff6b6b',
              padding: '6px 8px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff4444'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.borderColor = '#ff4444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,68,68,0.06)'
              e.currentTarget.style.color = '#ff6b6b'
              e.currentTarget.style.borderColor = 'rgba(255,68,68,0.15)'
            }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            Logout
          </button>
        </div>
      </div>

      {showLogoutConfirm && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '36px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
            textAlign: 'center',
            animation: 'slideUp 0.3s ease',
            fontFamily: 'system-ui, sans-serif'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(255, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <LogOut style={{ width: '32px', height: '32px', color: '#ff4444' }} />
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.4rem', color: '#1a1a1a', fontWeight: 700 }}>
              Confirm Logout
            </h3>
            <p style={{ margin: '0 0 32px 0', color: '#666666', fontSize: '1rem', lineHeight: '1.5' }}>
              Are you sure you want to sign out from the NÈSS Admin Dashboard?
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  background: 'white',
                  color: '#4a4a4a',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ff4444',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(255,68,68,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,68,68,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,68,68,0.3)'
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  )
}