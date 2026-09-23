'use client'

import React, { useEffect, useState } from 'react'
import { useDocumentInfo, useConfig } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

export const BlogView: React.FC = () => {
  const { id, collectionSlug } = useDocumentInfo()
  const [doc, setDoc] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { config } = useConfig()
  const adminRoute = config?.routes?.admin || '/admin'

  useEffect(() => {
    if (id) {
      fetch(`/api/${collectionSlug}/${id}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          setDoc(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [id, collectionSlug])

  const getImageUrl = (image: any) => {
    if (!image) return null
    if (typeof image === 'string') return image
    return image.url || image.s3Url
  }

  const getVideoUrl = (video: any) => {
    if (!video) return null
    if (typeof video === 'string') return video
    return video.url || video.s3Url
  }

  const renderLexical = (content: any) => {
    if (!content || !content.root || !content.root.children) return null

    return content.root.children.map((node: any, index: number) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index} style={{ marginBottom: '20px', lineHeight: '1.8', color: '#475569', fontSize: '17px' }}>
            {node.children?.map((child: any, childIdx: number) => {
              if (child.type === 'text') {
                return (
                  <span 
                    key={childIdx} 
                    style={{ 
                      fontWeight: child.format & 1 ? 'bold' : 'normal',
                      fontStyle: child.format & 2 ? 'italic' : 'normal',
                      textDecoration: child.format & 4 ? 'underline' : 'none'
                    }}
                  >
                    {child.text}
                  </span>
                )
              }
              return null
            })}
          </p>
        )
      }
      if (node.type === 'heading') {
        const Tag = node.tag as any
        const headingStyles: Record<string, React.CSSProperties> = {
          h1: { fontSize: '32px', fontWeight: '700', margin: '36px 0 16px', color: '#0f172a' },
          h2: { fontSize: '26px', fontWeight: '700', margin: '32px 0 16px', color: '#0f172a' },
          h3: { fontSize: '22px', fontWeight: '600', margin: '28px 0 12px', color: '#0f172a' },
        }
        return (
          <Tag key={index} style={headingStyles[node.tag as string] || { fontWeight: 'bold' }}>
            {node.children?.map((child: any, childIdx: number) => child.text).join('')}
          </Tag>
        )
      }
      if (node.type === 'list') {
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <ListTag key={index} style={{ paddingLeft: '24px', marginBottom: '24px', color: '#475569' }}>
            {node.children?.map((item: any, itemIdx: number) => (
              <li key={itemIdx} style={{ marginBottom: '8px' }}>
                {item.children?.map((child: any, childIdx: number) => child.text).join('')}
              </li>
            ))}
          </ListTag>
        )
      }
      return null
    })
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '400px', 
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '3px solid #e2e8f0', 
          borderTopColor: '#8b5cf6', 
          borderRadius: '50%', 
          animation: 'spin 0.8s linear infinite' 
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ marginTop: '20px', fontSize: '15px', color: '#94a3b8', fontWeight: '500' }}>Loading post...</p>
      </div>
    )
  }

  if (!doc) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px', 
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '24px'
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)',
          padding: '40px 48px', 
          borderRadius: '24px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'center', 
          maxWidth: '420px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px', fontWeight: '700' }}>Post Not Found</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>The post you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push(`${adminRoute}/collections/${collectionSlug}`)} 
            style={{ 
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '12px', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(139, 92, 246, 0.3)'
            }}
          >
            ← Back to Posts
          </button>
        </div>
      </div>
    )
  }

  const formattedDate = doc.date ? new Date(doc.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : ''

  return (
    <div style={{ 
      maxWidth: '1000%', 
      margin: '40px auto', 
      padding: '0 20px', 
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Back Button */}
      <button 
        onClick={() => router.push(`${adminRoute}/collections/${collectionSlug}`)}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)', 
          padding: '10px 20px', 
          borderRadius: '14px', 
          color: '#475569', 
          fontWeight: '500', 
          fontSize: '14px', 
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
          marginBottom: '28px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.9)'
          e.currentTarget.style.transform = 'translateX(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.7)'
          e.currentTarget.style.transform = 'translateX(0)'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back
      </button>

      {/* Main Article Card */}
      <article style={{ 
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
        overflow: 'hidden'
      }}>
        
        {/* Hero Image - Responsive sizing with max-height */}
        {doc.image && (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: 'auto',
            maxHeight: '480px',
            overflow: 'hidden',
            background: '#f8fafc'
          }}>
            <img 
              src={getImageUrl(doc.image) || ''} 
              alt={doc.title} 
              style={{ 
                width: '100%', 
                height: 'auto',
                maxHeight: '480px',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s ease'
              }} 
            />
            {/* Gradient overlay */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: '120px', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' 
            }} />
            
            {/* Category badge on image */}
            {doc.category && (
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#6d28d9',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {doc.category}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '48px 52px' }}>
          {/* Meta info */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              color: '#64748b',
              fontSize: '14px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {formattedDate}
            </div>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              color: '#64748b',
              fontSize: '14px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {doc.readTime || 4} min read
            </div>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '800', 
            lineHeight: '1.2', 
            color: '#0f172a', 
            margin: '0 0 24px 0', 
            letterSpacing: '-0.02em'
          }}>
            {doc.title}
          </h1>
          
          {/* Author */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            marginBottom: '36px', 
            paddingBottom: '32px', 
            borderBottom: '1px solid rgba(0,0,0,0.06)'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '700', 
              fontSize: '18px'
            }}>
              {doc.author ? doc.author.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a' }}>
                {doc.author || 'Admin'}
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                Writer • {doc.role || 'Contributor'}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          {doc.excerpt && (
            <div style={{ 
              fontSize: '19px', 
              lineHeight: '1.7', 
              color: '#475569', 
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(139, 92, 246, 0.02))',
              borderRadius: '16px',
              borderLeft: '4px solid #8b5cf6',
              marginBottom: '40px'
            }}>
              {doc.excerpt}
            </div>
          )}

          {/* Video Thumbnail - Opens in new tab */}
          {doc.video && (
            <div style={{ margin: '40px 0' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '14px'
              }}>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.8px', 
                  color: '#94a3b8',
                  margin: 0
                }}>
                  Video
                </h3>
              </div>
              <a
                href={getVideoUrl(doc.video) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div 
                  style={{ 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    background: doc.image 
                      ? `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.45)), url(${getImageUrl(doc.image)}) no-repeat center/cover`
                      : 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%',
                    height: 0,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'
                  }}
                >
                  {/* Play button circle */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '2.5px solid rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease, background-color 0.2s ease'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  
                  {/* Bottom label bar */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)',
                    padding: '24px 24px 18px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 2
                  }}>
                    <span style={{
                      color: '#ffffff',
                      fontSize: '15px',
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      ▶ Click to watch video
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Opens in new tab ↗
                    </span>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* External Links */}
          {doc.videoUrl && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              background: 'rgba(0,0,0,0.02)',
              padding: '14px 20px', 
              borderRadius: '14px', 
              marginBottom: '40px',
              border: '1px solid rgba(0,0,0,0.04)'
            }}>
              <span style={{ fontSize: '18px' }}>🔗</span>
              <span style={{ fontWeight: '500', fontSize: '14px', color: '#475569' }}>Reference:</span>
              <a 
                href={doc.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: '#8b5cf6', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontWeight: '500',
                  wordBreak: 'break-all',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#6d28d9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#8b5cf6'}
              >
                {doc.videoUrl.replace(/^https?:\/\//, '')} ↗
              </a>
            </div>
          )}

          <hr style={{ 
            border: '0', 
            height: '1px', 
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)',
            margin: '44px 0 40px'
          }} />

          {/* Main Content */}
          <div style={{ fontSize: '17px', lineHeight: '1.8', color: '#334155' }}>
            {typeof doc.content === 'string' ? (
              <p style={{ marginBottom: '20px' }}>{doc.content}</p>
            ) : (
              renderLexical(doc.content)
            )}
          </div>

          {/* Footer tags or metadata */}
          <div style={{ 
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {doc.tags && doc.tags.map((tag: string, i: number) => (
                <span 
                  key={i}
                  style={{
                    background: 'rgba(139, 92, 246, 0.08)',
                    color: '#6d28d9',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'rgba(0,0,0,0.04)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                color: '#64748b',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
              }}
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogView