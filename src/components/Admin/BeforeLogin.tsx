'use client'
import React from 'react'
import { useEffect } from 'react'




export const BeforeLogin: React.FC = () => {
    useEffect(() => {
    setTimeout(() => {
      const passwordInput = document.querySelector('#field-password') as HTMLInputElement | null
 
      if (!passwordInput) return
 
      const wrapper = passwordInput.parentElement as HTMLElement
 
      if (document.getElementById('custom-eye-toggle')) return
 
      wrapper.style.position = 'relative'
 
      const eye = document.createElement('img')
      eye.id = 'custom-eye-toggle'
      eye.src = '/hide.png'
      eye.style.position = 'absolute'
      eye.style.right = '15px'
      eye.style.top = '50%'
      eye.style.transform = 'translateY(-50%)'
      eye.style.width = '20px'
      eye.style.height = '20px'
      eye.style.cursor = 'pointer'
      eye.style.zIndex = '999'
 
      let visible = false
 
      eye.onclick = () => {
        visible = !visible
 
        const currentInput = document.querySelector('#field-password') as HTMLInputElement | null
 
        if (!currentInput) return
 
        currentInput.type = visible ? 'text' : 'password'
        eye.src = visible ? '/eye.png' : '/hide.png'
      }
 
      wrapper.appendChild(eye)
    }, 1000)
  }, [])
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        /* ─── RESET & FULL-SCREEN LAYOUT ─── */
        :root {
          --brand-green:  #2563c9;
          --brand-green-hover: #0f2f63;
          --glass-bg:   rgba(255, 255, 255, 0.85);
          --glass-bd:   rgba(255, 255, 255, 0.6);
          --text-dark:  #1a1a1a;
          --text-light: #666666;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #app, .app {
          font-family: 'Outfit', sans-serif !important;
        }

        /* ─── FULL PAGE OVERRIDE ─── */
        .login__wrap,
        body:has(.login__form) {
          min-height: 100vh !important;
          width: 100vw !important;
          display: flex !important;
          align-items: stretch !important;
          padding: 0 !important;
          margin: 0 !important;
          background: #f8fcf6 !important;
          overflow: hidden !important;
          position: relative !important;
        }

        /* ─── ANIMATED BACKGROUND ─── */
        .login__wrap::before {
          content: '' !important;
          position: fixed !important;
          inset: 0 !important;
          background: linear-gradient(-45deg, #f8fcf6, #e8f5e1, #ffffff, #dff0d6) !important;
          background-size: 400% 400% !important;
          animation: gradientBG 15s ease infinite !important;
          z-index: 0 !important;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ─── HIDE PAYLOAD DEFAULTS ─── */
        .login__header,
        .login__logo,
        .login__brand,
        .payload-logo,
        .graphics-logo {
          display: none !important;
          height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        #custom-login-logo-container {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        /* ─── LOGIN FORM WRAPPER ─── */
        .login__form,
        .form-signin {
          position: relative !important;
          z-index: 10 !important;
          background: var(--glass-bg) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
          border: 1px solid var(--glass-bd) !important;
          border-top: none !important; 
          border-bottom-left-radius: 32px !important;
          border-bottom-right-radius: 32px !important;
          border-top-left-radius: 0 !important;
          border-top-right-radius: 0 !important;
          padding: 20px 48px 52px 48px !important;
          width: 100% !important;
          max-width: 420px !important;
          margin: 0 auto !important;
          box-shadow: 0 20px 60px -10px rgba(93, 156, 69, 0.15) !important;
          animation: slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both !important;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── HEADING ─── */
        .login__form h1,
        .form-signin h1 {
          display: none !important;
        }

        /* ─── LABELS ─── */
        .field-type label,
        label.field-label {
          font-family: 'Outfit', sans-serif !important;
          color: var(--text-dark) !important;
          font-size: 0.8rem !important;
          font-weight: 600 !important;
          letter-spacing: 1px !important;
          text-transform: uppercase !important;
          margin-bottom: 8px !important;
          display: block !important;
        }

        /* ─── INPUTS ─── */
        .field-type input,
        input[type="email"],
        input[type="password"],
        input[type="text"] {
          font-family: 'Outfit', sans-serif !important;
          background: #ffffff !important;
          border: 1px solid rgba(0,0,0,0.1) !important;
          border-radius: 14px !important;
          color: var(--text-dark) !important;
          padding: 16px 20px !important;
          font-size: 1rem !important;
          font-weight: 500 !important;
          width: 100% !important;
          transition: all 0.3s ease !important;
          outline: none !important;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.02) !important;
        }

        .field-type input:focus,
        input[type="email"]:focus,
        input[type="password"]:focus {
          background: #ffffff !important;
          border-color: var(--brand-green) !important;
          box-shadow: 0 0 0 4px rgba(93, 156, 69, 0.15) !important;
        }

        .field-type input::placeholder {
          color: rgba(0,0,0,0.3) !important;
        }

        /* ─── FORGOT PASSWORD ─── */
        a[href*="forgot"] {
          color: var(--brand-green) !important;
          font-size: 0.85rem !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          opacity: 0.9 !important;
          transition: opacity 0.2s !important;
          display: block !important;
        }
        a[href*="forgot"]:hover { opacity: 1 !important; text-decoration: underline !important; }

        /* ─── SUBMIT BUTTON ─── */
        .btn--style-primary,
        button[type="submit"] {
          font-family: 'Outfit', sans-serif !important;
          background: var(--brand-green) !important;
          border: none !important;
          border-radius: 14px !important;
          color: #fff !important;
          font-weight: 700 !important;
          font-size: 1rem !important;
          letter-spacing: 1px !important;
          text-transform: uppercase !important;
          height: 48px !important;
          width: 100% !important;
          margin-top: 16px !important;
          cursor: pointer !important;
          box-shadow: 0 8px 24px -6px rgba(93,156,69,0.4) !important;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1) !important;
        }

        .btn--style-primary:hover,
        button[type="submit"]:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 30px -8px rgba(93,156,69,0.6) !important;
          background: var(--brand-green-hover) !important;
        }

        .btn--style-primary:active,
        button[type="submit"]:active {
          transform: translateY(0) !important;
        }

        /* ─── FIELD SPACING ─── */
        .field-type {
          margin-bottom: 8px !important;
        }

        /* ─── FLOATING BG ORBS ─── */
        .at-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: floatOrb 10s ease-in-out infinite alternate;
        }
        .at-orb-1 {
          width: 600px; height: 600px;
          background: rgba(93, 156, 69, 0.15);
          top: -150px; right: -100px;
        }
        .at-orb-2 {
          width: 500px; height: 500px;
          background: rgba(124, 184, 100, 0.1);
          bottom: -100px; left: -100px;
          animation-delay: -5s;
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 40px) scale(1.1); }
        }

        /* ─── EYE ICON OVERRIDE ─── */
        #custom-eye-toggle {
          filter: invert(0.5) !important;
        }

        /* ─── FORM ERROR TOOLTIP TO INLINE TEXT ─── */
        .tooltip, .field-error {
          position: relative !important;
          background: transparent !important;
          color: #ff3b30 !important;
          padding: 4px 0 0 0 !important;
          box-shadow: none !important;
          transform: none !important;
          left: 0 !important;
          top: 0 !important;
          display: block !important;
          font-weight: 500 !important;
          text-align: left !important;
        }
        .tooltip::after, .tooltip::before,
        .field-error::after, .field-error::before {
          display: none !important;
        }

        /* ─── TOAST / NOTIFICATION TOP-RIGHT ALIGNMENT & DESIGN ─── */
        [data-sonner-toaster], .toaster, ol[data-sonner-toaster] {
          top: 24px !important;
          right: 24px !important;
          bottom: auto !important;
          left: auto !important;
          position: fixed !important;
          z-index: 999999 !important;
        }
        [data-sonner-toast], li.toast, div.toast {
          background: #fff5f5 !important;
          color: #c53030 !important;
          border: 1px solid rgba(229, 62, 62, 0.2) !important;
          border-left: 5px solid #e53e3e !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1) !important;
          padding: 16px 24px !important;
          font-family: 'Outfit', sans-serif !important;
          font-size: 0.95rem !important;
          font-weight: 550 !important;
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          min-width: 320px !important;
          position: relative !important;
        }
        [data-sonner-toast] [data-close-button],
        li.toast button[class*="close"],
        div.toast button[class*="close"] {
          background: rgba(0, 0, 0, 0.05) !important;
          border: none !important;
          color: currentColor !important;
          border-radius: 50% !important;
          width: 22px !important;
          height: 22px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: absolute !important;
          top: 50% !important;
          right: 12px !important;
          left: auto !important; /* Override Sonner inline left positioning */
          transform: translateY(-50%) !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          opacity: 0.7 !important;
          z-index: 99 !important;
        }
        [data-sonner-toast] [data-close-button]:hover,
        li.toast button[class*="close"]:hover,
        div.toast button[class*="close"]:hover {
          opacity: 1 !important;
          background: rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>

      {/* Floating ambient orbs */}
      <div className="at-orb at-orb-1" />
      <div className="at-orb at-orb-2" />

      {/* Logo Container — Merged with Form Box */}
      <div id="custom-login-logo-container" style={{
        position: 'relative',
        zIndex: 11,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderBottom: 'none',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        width: '100%',
        maxWidth: '420px',
        margin: '0px auto 0 auto',
        padding: '30px 48px 10px 48px',
        textAlign: 'center',
        animation: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both'
      }}>
        <h1 style={{
          color: '#2563c9',
          fontSize: '2.5rem',
          fontWeight: '800',
          margin: '0',
          padding: '20px 0'
        }}>We Brand</h1>
      </div>
    </>
  )
}
