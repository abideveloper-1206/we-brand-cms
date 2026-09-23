'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useConfig } from '@payloadcms/ui'

export const BlogTitleCell: React.FC<{ cellData: any, rowData: any }> = ({ cellData, rowData }) => {
  const router = useRouter()
  const { config } = useConfig()
  const adminRoute = config?.routes?.admin || '/admin'

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`${adminRoute}/collections/blogs/${rowData.id}/view`)
  }

  // Handle localization object or plain string
  let displayTitle = ''
  if (typeof cellData === 'string') {
    displayTitle = cellData
  } else if (cellData && typeof cellData === 'object') {
    displayTitle = cellData.en || cellData.ar || Object.values(cellData).find(v => typeof v === 'string') as string || ''
  }

  // Fallback to rowData.title if cellData is not available
  if (!displayTitle && rowData?.title) {
    if (typeof rowData.title === 'string') {
      displayTitle = rowData.title
    } else if (typeof rowData.title === 'object') {
      displayTitle = rowData.title.en || rowData.title.ar || Object.values(rowData.title).find(v => typeof v === 'string') as string || ''
    }
  }

  if (!displayTitle) {
    displayTitle = 'Untitled'
  }

  return (
    <div 
      onClick={handleClick} 
      style={{ 
        cursor: 'pointer', 
        color: 'black', 
        fontWeight: '600',
        textDecoration: 'underline',
        textDecorationColor: 'rgba(44, 74, 46, 0.2)',
        textUnderlineOffset: '4px'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#FAAD03')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
    >
      {displayTitle}
    </div>
  )
}

export default BlogTitleCell
