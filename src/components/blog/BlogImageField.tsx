'use client'

import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import './field-styles.css'

export const BlogImageField: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<any>({ path })
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch preview when value changes
  useEffect(() => {
    const fetchPreview = async () => {
      if (!value) {
        setPreviewUrl(null)
        return
      }

      // If value is already an object with a URL
      if (typeof value === 'object') {
        const url = value.url || value.s3Url
        if (url) {
          setPreviewUrl(url)
          return
        }
        // If it's an object but missing URL, it might be the media doc without population
        if (value.id) {
           const res = await fetch(`/api/media/${value.id}`)
           if (res.ok) {
             const data = await res.json()
             setPreviewUrl(data.url || data.s3Url)
             return
           }
        }
      }

      // If value is a string
      if (typeof value === 'string' && value.length > 0) {
        // Check if it's a direct URL (backward compatibility)
        if (value.startsWith('http') || value.startsWith('/')) {
          setPreviewUrl(value)
          return
        }
        
        // Otherwise treat as Media ID
        try {
          const res = await fetch(`/api/media/${value}`)
          if (res.ok) {
            const data = await res.json()
            setPreviewUrl(data.url || data.s3Url)
          }
        } catch (err) {
          console.error('Error fetching preview:', err)
        }
      }
    }

    fetchPreview()
  }, [value])

  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', file.name)

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        // Payload returns the created document in data.doc
        setValue(data.doc.id)
      } else {
        alert('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Error uploading:', error)
      alert('Error uploading file.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [setValue])

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="blog-custom-image-field">
      <div className="field-header">
        <label className="field-label">Blog Image</label>
      </div>
      
      <div className="image-upload-wrapper">
        {previewUrl ? (
          <div className="image-preview-container">
            <div className="preview-box">
              <img src={previewUrl} alt="Blog post image" className="full-preview-img" />
            </div>
            <button 
              type="button" 
              className="change-file-btn" 
              onClick={triggerUpload}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Change File'}
            </button>
          </div>
        ) : (
          <div className="upload-placeholder" onClick={triggerUpload}>
            <div className="placeholder-content">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
            </div>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        style={{ display: 'none' }} 
        accept="image/*"
      />
    </div>
  )
}

export default BlogImageField
