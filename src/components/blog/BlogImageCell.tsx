'use client'

import React from 'react'
import './styles.css'

export const BlogImageCell: React.FC<{ cellData: any, rowData: any }> = ({ cellData, rowData }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchUrl = async () => {
      // 1. Direct URL (string)
      if (typeof cellData === 'string' && (cellData.startsWith('http') || cellData.startsWith('/'))) {
        setImageUrl(cellData)
        return
      }

      // 2. Populated Media Object
      const mediaObj = (typeof cellData === 'object' ? cellData : rowData?.image) as any
      if (mediaObj && typeof mediaObj === 'object') {
        const url = mediaObj.url || mediaObj.s3Url
        if (url) {
          setImageUrl(url)
          return
        }
      }

      // 3. Media ID (string that needs fetching)
      const id = typeof cellData === 'string' ? cellData : (typeof rowData?.image === 'string' ? rowData.image : null)
      if (id && id.length > 5) {
        try {
          const res = await fetch(`/api/media/${id}`)
          if (res.ok) {
            const data = await res.json()
            setImageUrl(data.url || data.s3Url)
          }
        } catch (err) {
          console.error('Error fetching image for table cell:', err)
        }
      }
    }

    fetchUrl()
  }, [cellData, rowData])

  return (
    <div className="blog-image-cell">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="blog-table-img"
          onError={() => setImageUrl(null)}
        />
      ) : (
        <div className="blog-fallback-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default BlogImageCell
