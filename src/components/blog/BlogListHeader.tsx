'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useConfig } from '@payloadcms/ui'
import './styles.css'


export const BlogListHeader: React.FC = () => {
  const router = useRouter()
  const { config } = useConfig()
  const adminRoute = config?.routes?.admin || '/admin'

  const handleCreate = () => {
    router.push(`${adminRoute}/collections/blogs/create`)
  }

  return (
    <div className="blog-list-header-actions">
      <div className="blog-tabs">
        <button className="blog-tab active">Blog List</button>
        <button className="blog-tab" onClick={handleCreate}>Create Blog</button>
      </div>
    </div>
  )
}

export default BlogListHeader
