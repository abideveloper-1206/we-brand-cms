'use client'

import React from 'react'

interface GlobalSkeletonProps {
  message?: string
}

export const GlobalSkeleton: React.FC<GlobalSkeletonProps> = ({ message = 'Loading...' }) => {
  return (
    <div style={{ padding: '48px', width: '100%', maxWidth: '1400px', margin: '0 auto', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes pulse-skeleton {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
        .skeleton-block {
          background: rgba(128, 128, 128, 0.2);
          border-radius: 6px;
          animation: pulse-skeleton 1.5s infinite ease-in-out;
        }
        .skeleton-card {
          background: rgba(128, 128, 128, 0.04);
          border: 1px solid rgba(128, 128, 128, 0.08);
          border-radius: 8px;
          padding: 32px;
        }
      `}</style>

      {/* Header Skeleton */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div className="skeleton-block" style={{ width: '280px', height: '40px', borderRadius: '8px' }} />
        <div className="skeleton-block" style={{ width: '120px', height: '40px', borderRadius: '8px' }} />
      </div>
      
      {/* Body Skeleton */}
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {/* Main Content Area */}
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="skeleton-card">
            <div className="skeleton-block" style={{ width: '140px', height: '16px', marginBottom: '20px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '48px' }} />
          </div>
          <div className="skeleton-card">
            <div className="skeleton-block" style={{ width: '180px', height: '16px', marginBottom: '20px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '160px' }} />
          </div>
          <div className="skeleton-card">
            <div className="skeleton-block" style={{ width: '110px', height: '16px', marginBottom: '20px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '48px' }} />
          </div>
        </div>
        
        {/* Sidebar Area */}
        <div style={{ flex: '1 1 30%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="skeleton-card">
            <div className="skeleton-block" style={{ width: '100px', height: '16px', marginBottom: '20px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '48px' }} />
          </div>
          <div className="skeleton-card">
            <div className="skeleton-block" style={{ width: '130px', height: '16px', marginBottom: '20px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '48px', marginBottom: '12px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '48px' }} />
          </div>
          <div className="skeleton-card">
            <div className="skeleton-block" style={{ width: '90px', height: '16px', marginBottom: '20px' }} />
            <div className="skeleton-block" style={{ width: '100%', height: '80px' }} />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', color: 'rgba(128,128,128,0.8)', fontSize: '0.95rem', fontWeight: 500 }}>
        {message}
      </div>
    </div>
  )
}
