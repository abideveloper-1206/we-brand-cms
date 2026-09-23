'use client'

import React from 'react'

export const BlogVideoCell: React.FC<{ cellData: any }> = ({ cellData }) => {
  if (!cellData) return <span style={{ color: '#555' }}>No video</span>

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        borderRadius: '6px', 
        background: 'rgba(255, 107, 0, 0.1)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#FAAD03'
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 7l-7 5 7 5V7z"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      </div>
      <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Video added</span>
    </div>
  )
}

export default BlogVideoCell
