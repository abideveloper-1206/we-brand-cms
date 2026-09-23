'use client'

import React from 'react'
import './styles.css'

export const BlogStatusCell: React.FC<{ cellData: string }> = ({ cellData }) => {
  const label = cellData === 'published' ? 'Active' : 'Draft'
  
  return (
    <div className="blog-status-badge">
      {label}
    </div>
  )
}

export default BlogStatusCell
