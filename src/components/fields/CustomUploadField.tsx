'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useField, FieldLabel } from '@payloadcms/ui'
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Edit, 
  Trash2, 
  Upload, 
  X, 
  Loader2,
  Search,
  CheckCircle2,
  Plus,
  Sparkles,
  ArrowLeft
} from 'lucide-react'

interface MediaDoc {
  id: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  alt?: string
}

interface CustomUploadFieldProps {
  field: any
  path: string
}

export const CustomUploadField: React.FC<CustomUploadFieldProps> = ({ field, path }) => {
  const { value, setValue } = useField<string | MediaDoc>({ path })
  
  const [mediaInfo, setMediaInfo] = useState<MediaDoc | null>(null)
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerMounted, setIsDrawerMounted] = useState(false)
  
  // Library State
  const [showLibPanel, setShowLibPanel] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaDoc[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingLib, setIsLoadingLib] = useState(false)
  
  // Upload State
  const [isUploading, setIsUploading] = useState(false)
  const [uploadAlt, setUploadAlt] = useState('')
  
  // Temp State for Selection
  const [tempSrc, setTempSrc] = useState<string | null>(null)
  const [tempMediaObj, setTempMediaObj] = useState<MediaDoc | null>(null)

  const drawerRef = useRef<HTMLDivElement>(null)

  // Fetch current media info if value is an ID
  const fetchMediaInfo = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`)
      if (res.ok) {
        const doc = await res.json()
        setMediaInfo(doc)
      }
    } catch (e) {
      console.error(`Error fetching media details for id: ${id}`, e)
    }
  }, [])

  useEffect(() => {
    if (!value) {
      setMediaInfo(null)
      return
    }
    
    if (typeof value === 'object' && value !== null) {
      setMediaInfo(value as MediaDoc)
    } else if (typeof value === 'string') {
      fetchMediaInfo(value)
    }
  }, [value, fetchMediaInfo])

  // --- ESCAPE KEY EVENT HANDLER ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen])

  // --- DRAWER ACTIONS ---
  const openDrawer = () => {
    setTempSrc(typeof value === 'object' ? value?.id : value || null)
    setTempMediaObj(null)
    setUploadAlt('')
    setShowLibPanel(false)
    setSearchQuery('')
    setIsDrawerMounted(true)
    document.body.style.overflow = 'hidden' // Main body scroll block panel tracker
    setTimeout(() => setIsDrawerOpen(true), 10)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => {
      setIsDrawerMounted(false)
      setShowLibPanel(false)
    }, 400)
  }

  const handleSave = () => {
    if (tempSrc) {
      setValue(tempSrc)
      if (tempMediaObj && tempMediaObj.id === tempSrc) {
        setMediaInfo(tempMediaObj)
      }
    } else {
      setValue(null)
      setMediaInfo(null)
    }
    closeDrawer()
  }

  // --- MEDIA LIBRARY ---
  const loadLibrary = async () => {
    setShowLibPanel(true)
    setIsLoadingLib(true)
    try {
      const res = await fetch('/api/media?limit=100')
      if (res.ok) {
        const data = await res.json()
        if (data && Array.isArray(data.docs)) {
          setMediaItems(data.docs)
        }
      }
    } catch (e) {
      console.error('Error fetching media items:', e)
    } finally {
      setIsLoadingLib(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', uploadAlt || file.name.split('.')[0])
    
    try {
      const res = await fetch('/api/media', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        if (data && data.doc) {
          const doc: MediaDoc = data.doc
          setTempSrc(doc.id)
          setTempMediaObj(doc)
          setShowLibPanel(false)
        } else {
          alert('Upload completed, but failed to retrieve media details.')
        }
      } else {
        const errorText = await res.text()
        alert(`Failed to upload file: ${errorText || res.statusText}`)
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('An error occurred during file upload.')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const filteredMediaItems = mediaItems.filter(item => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return item.filename?.toLowerCase().includes(search) || item.alt?.toLowerCase().includes(search)
  })

  const selectedMediaObj = tempSrc 
    ? (
        (tempMediaObj?.id === tempSrc ? tempMediaObj : null) ||
        mediaItems.find(m => m.id === tempSrc) || 
        (tempSrc === mediaInfo?.id ? mediaInfo : null)
      )
    : null;

  return (
    <>
      <div id="cuf-root-id" className="cuf-root">
        <FieldLabel label={field.label || field.name} required={field.required} />

        {!value ? (
          <div className="cuf-empty" onClick={openDrawer}>
            <div className="cuf-empty__icon">
              <ImageIcon size={24} strokeWidth={1.5} />
            </div>
            <div className="cuf-empty__content">
              <span className="cuf-empty__title">Select or Upload Image</span>
              <span className="cuf-empty__subtitle">Click to choose a file from your library</span>
            </div>
            <div className="cuf-empty__action">
              <Plus size={18} />
            </div>
          </div>
        ) : (
          <div className="cuf-card">
            <div className="cuf-card__thumb">
              {mediaInfo?.url ? (
                <img src={mediaInfo.url} alt={mediaInfo.alt || mediaInfo.filename} className="cuf-card__media" />
              ) : (
                <div className="cuf-card__placeholder">
                  <Loader2 className="cuf-spin" size={20} />
                </div>
              )}
            </div>
            <div className="cuf-card__body">
              <h4 className="cuf-card__filename" title={mediaInfo?.filename}>
                {mediaInfo?.filename || 'Loading...'}
              </h4>
              <div className="cuf-card__meta">
                {mediaInfo?.filesize && <span>{(mediaInfo.filesize / 1024).toFixed(1)} KB</span>}
                {mediaInfo?.width && <span>{mediaInfo.width}×{mediaInfo.height}</span>}
              </div>
            </div>
            <div className="cuf-card__actions">
              <button type="button" className="cuf-icon-btn cuf-icon-btn--edit" onClick={openDrawer} title="Edit Image">
                <Edit size={15} />
              </button>
              <button type="button" className="cuf-icon-btn cuf-icon-btn--delete" onClick={() => setValue(null)} title="Remove Image">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT-SIDE DRAWER (PORTAL) ── */}
      {isDrawerMounted && typeof document !== 'undefined' && createPortal(
        <div id="cuf-drawer-container">
      
          <div ref={drawerRef} className={`cuf-drawer ${isDrawerOpen ? 'cuf-drawer--open' : ''}`} style={{ zIndex: 2147483647 }}>
            
         
           <div className="cuf-drawer__header">
  <div className="cuf-drawer__title-wrapper">
    <h3 className="cuf-drawer__title">

    </h3>
    <p className="cuf-drawer__subtitle"></p>
  </div>

  <button
    type="button"
    className="cuf-drawer__close"
    onClick={closeDrawer}
  >
    <X size={18} />
  </button>
</div>

            {/* Body */}
            <div className="cuf-drawer__body">
              {showLibPanel ? (
                /* ── MEDIA LIBRARY PANEL ── */
                <div className="cuf-lib">
                  <div className="cuf-lib__header">
                    <button type="button" className="cuf-lib__back" onClick={() => setShowLibPanel(false)}>
                      <ArrowLeft size={16} /> Back to Upload
                    </button>
                    <h3 className="cuf-lib__title">Media Library</h3>
                  </div>

                  <div className="cuf-lib__toolbar">
                    <div className="cuf-lib__search">
                      <Search size={15} className="cuf-lib__search-icon" />
                      <input
                        type="text"
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="cuf-lib__search-input"
                      />
                    </div>
                  </div>

                  {isLoadingLib ? (
                    <div className="cuf-lib__loading">
                      <Loader2 size={24} className="cuf-spin" />
                      <span>Loading library...</span>
                    </div>
                  ) : filteredMediaItems.length === 0 ? (
                    <div className="cuf-lib__empty">
                      <ImageIcon size={28} />
                      <span>No files found.</span>
                    </div>
                  ) : (
                    <div className="cuf-lib__grid">
                      {filteredMediaItems.map((item) => {
                        const isSelected = tempSrc === item.id
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`cuf-lib__item ${isSelected ? 'cuf-lib__item--selected' : ''}`}
                            onClick={() => {
                              setTempSrc(item.id)
                              setShowLibPanel(false)
                            }}
                          >
                            {isSelected && (
                              <div className="cuf-lib__item-check">
                                <CheckCircle2 size={16} />
                              </div>
                            )}
                            {item.url ? (
                              <img src={item.url} alt={item.alt || item.filename} className="cuf-lib__item-media" />
                            ) : (
                              <div className="cuf-lib__item-placeholder">
                                <ImageIcon size={18} />
                              </div>
                            )}
                            <div className="cuf-lib__item-label">{item.filename}</div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* ── UPLOAD / PREVIEW PANEL ── */
                <div className="cuf-editor">
                  
                  {selectedMediaObj && (
                    <div className="cuf-section">
                      <h4 className="cuf-section__title">Selected Media</h4>
                      <div className="cuf-preview">
                        <div className="cuf-preview__thumb">
                          {selectedMediaObj.url ? (
                            <img src={selectedMediaObj.url} alt={selectedMediaObj.alt} className="cuf-preview__media" />
                          ) : (
                            <div className="cuf-preview__placeholder"><ImageIcon size={24} /></div>
                          )}
                        </div>
                        <div className="cuf-preview__info">
                          <p className="cuf-preview__filename">{selectedMediaObj.filename}</p>
                          <div className="cuf-preview__actions">
                            <button type="button" className="cuf-btn cuf-btn--danger" style={{ width: '100%' }} onClick={() => setTempSrc(null)}>
                              <Trash2 size={14} /> Clear Selection
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="cuf-section">
                    <h4 className="cuf-section__title">{selectedMediaObj ? 'Change / Upload New Media' : 'Upload New Media'}</h4>
                    <div className="cuf-upload-box">
                      
                      <div className="cuf-field">
                        <label>Alt Text (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="Describe the image..." 
                          value={uploadAlt}
                          onChange={(e) => setUploadAlt(e.target.value)}
                          disabled={isUploading}
                        />
                      </div>

                      <label className={`cuf-btn cuf-btn--upload-massive ${isUploading ? 'loading' : ''}`}>
                        <div className="cuf-btn--upload-massive-content">
                          {isUploading ? <Loader2 size={28} className="cuf-spin" /> : <Upload size={28} />}
                          <span>{isUploading ? 'Uploading file to server...' : 'Click to Browse File'}</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleUpload}
                          className="cuf-real-hidden-input"
                          hidden
                          disabled={isUploading}
                        />
                      </label>

                      <div className="cuf-divider">
                        <span>OR</span>
                      </div>

                      <button type="button" className="cuf-btn cuf-btn--library-massive" onClick={loadLibrary}>
                        <Search size={16} /> Choose from Library
                      </button>

                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer */}
            {!showLibPanel && (
              <div className="cuf-drawer__footer">
                <button type="button" className="cuf-btn cuf-btn--ghost" onClick={closeDrawer}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="cuf-btn cuf-btn--primary" 
                  onClick={handleSave}
                >
                  <CheckCircle2 size={16} />
                  {tempSrc ? 'Confirm Selection' : 'Clear & Save'}
                </button>
              </div>
            )}

          </div>
        </div>,
        document.body
      )}

    </>
  )
}

export default CustomUploadField