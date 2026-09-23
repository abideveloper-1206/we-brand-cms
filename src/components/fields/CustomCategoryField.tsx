'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useField, FieldLabel } from '@payloadcms/ui'
import { 
  Folder as CategoryIcon, 
  Edit, 
  Trash2, 
  Plus, 
  X, 
  Loader2,
  Search,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react'

interface CategoryDoc {
  id: string
  name?: string
  slug?: string
  subText?: string
}

interface CustomCategoryFieldProps {
  field: any
  path: string
}

export const CustomCategoryField: React.FC<CustomCategoryFieldProps> = ({ field, path }) => {
  const { value, setValue } = useField<string | CategoryDoc>({ path })
  
  const [categoryInfo, setCategoryInfo] = useState<CategoryDoc | null>(null)
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerMounted, setIsDrawerMounted] = useState(false)
  
  // Library State
  const [showLibPanel, setShowLibPanel] = useState(false)
  const [categoryItems, setCategoryItems] = useState<CategoryDoc[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingLib, setIsLoadingLib] = useState(false)
  
  // Upload/Create State
  const [isUploading, setIsUploading] = useState(false)
  const [createName, setCreateName] = useState('')
  const [createSlug, setCreateSlug] = useState('')
  const [createSubText, setCreateSubText] = useState('')
  
  // Temp State for Selection
  const [tempSrc, setTempSrc] = useState<string | null>(null)
  const [tempCategoryObj, setTempCategoryObj] = useState<CategoryDoc | null>(null)

  const drawerRef = useRef<HTMLDivElement>(null)

  // Fetch current category info if value is an ID
  const fetchCategoryInfo = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`)
      if (res.ok) {
        const doc = await res.json()
        setCategoryInfo(doc)
      }
    } catch (e) {
      console.error(`Error fetching category details for id: ${id}`, e)
    }
  }, [])

  useEffect(() => {
    if (!value) {
      setCategoryInfo(null)
      return
    }
    
    if (typeof value === 'object' && value !== null) {
      setCategoryInfo(value as CategoryDoc)
    } else if (typeof value === 'string') {
      fetchCategoryInfo(value)
    }
  }, [value, fetchCategoryInfo])

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
    setTempCategoryObj(null)
    setCreateName('')
    setCreateSlug('')
    setCreateSubText('')
    setShowLibPanel(false)
    setSearchQuery('')
    setIsDrawerMounted(true)
    document.body.style.overflow = 'hidden'
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
      if (tempCategoryObj && tempCategoryObj.id === tempSrc) {
        setCategoryInfo(tempCategoryObj)
      } else {
        fetchCategoryInfo(tempSrc)
      }
    } else {
      setValue(null)
      setCategoryInfo(null)
    }
    closeDrawer()
  }

  // --- CATEGORY LIBRARY ---
  const loadLibrary = async () => {
    setShowLibPanel(true)
    setIsLoadingLib(true)
    try {
      const res = await fetch('/api/categories?limit=100')
      if (res.ok) {
        const data = await res.json()
        if (data && Array.isArray(data.docs)) {
          setCategoryItems(data.docs)
        }
      }
    } catch (e) {
      console.error('Error fetching categories:', e)
    } finally {
      setIsLoadingLib(false)
    }
  }

  const handleCreate = async () => {
    if (!createName || !createSlug) {
      alert('Name and Slug are required')
      return
    }
    
    setIsUploading(true)
    
    try {
      const res = await fetch('/api/categories', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: createName,
          slug: createSlug,
          subText: createSubText
        }) 
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.doc) {
          const doc: CategoryDoc = data.doc
          setTempSrc(doc.id)
          setTempCategoryObj(doc)
          setShowLibPanel(false)
          setCreateName('')
          setCreateSlug('')
          setCreateSubText('')
        } else {
          alert('Creation completed, but failed to retrieve details.')
        }
      } else {
        const errorText = await res.text()
        alert('Failed to create category: ' + (errorText || res.statusText))
      }
    } catch (err) {
      console.error('Creation error:', err)
      alert('An error occurred during category creation.')
    } finally {
      setIsUploading(false)
    }
  }

  const filteredCategoryItems = categoryItems.filter(item => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return item.name?.toLowerCase().includes(search) || item.slug?.toLowerCase().includes(search)
  })

  const selectedCategoryObj = tempSrc 
    ? (
        (tempCategoryObj?.id === tempSrc ? tempCategoryObj : null) ||
        categoryItems.find(m => m.id === tempSrc) || 
        (tempSrc === categoryInfo?.id ? categoryInfo : null)
      )
    : null;

  return (
    <>
      <div id="cuf-root-id" className="cuf-root">
        <FieldLabel label={field.label || field.name} required={field.required} />

        {!value ? (
          <div className="cuf-empty" onClick={openDrawer}>
            <div className="cuf-empty__icon">
              <CategoryIcon size={24} strokeWidth={1.5} />
            </div>
            <div className="cuf-empty__content">
              <span className="cuf-empty__title">Select or Create Category</span>
              <span className="cuf-empty__subtitle">Click to choose a category from your library</span>
            </div>
            <div className="cuf-empty__action">
              <Plus size={18} />
            </div>
          </div>
        ) : (
          <div className="cuf-card">
            <div className="cuf-card__thumb">
              <div className="cuf-card__placeholder">
                <CategoryIcon size={24} />
              </div>
            </div>
            <div className="cuf-card__body">
              <h4 className="cuf-card__filename" title={categoryInfo?.name}>
                {categoryInfo?.name || categoryInfo?.slug || 'Loading...'}
              </h4>
              <div className="cuf-card__meta">
                {categoryInfo?.slug && <span>Slug: {categoryInfo.slug}</span>}
              </div>
            </div>
            <div className="cuf-card__actions">
              <button type="button" className="cuf-icon-btn cuf-icon-btn--edit" onClick={openDrawer} title="Edit Category">
                <Edit size={15} />
              </button>
              <button type="button" className="cuf-icon-btn cuf-icon-btn--delete" onClick={() => setValue(null)} title="Remove Category">
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
                <h3 className="cuf-drawer__title"></h3>
                <p className="cuf-drawer__subtitle"></p>
              </div>

              <button type="button" className="cuf-drawer__close" onClick={closeDrawer}>
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="cuf-drawer__body">
              {showLibPanel ? (
                /* ── LIBRARY PANEL ── */
                <div className="cuf-lib">
                  <div className="cuf-lib__header">
                    <button type="button" className="cuf-lib__back" onClick={() => setShowLibPanel(false)}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <h3 className="cuf-lib__title">Category Library</h3>
                  </div>

                  <div className="cuf-lib__toolbar">
                    <div className="cuf-lib__search">
                      <Search size={15} className="cuf-lib__search-icon" />
                      <input
                        type="text"
                        placeholder="Search categories..."
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
                  ) : filteredCategoryItems.length === 0 ? (
                    <div className="cuf-lib__empty">
                      <CategoryIcon size={28} />
                      <span>No categories found.</span>
                    </div>
                  ) : (
                    <div className="cuf-lib__grid">
                      {filteredCategoryItems.map((item) => {
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
                            <div className="cuf-lib__item-placeholder">
                              <CategoryIcon size={18} />
                            </div>
                            <div className="cuf-lib__item-label">{item.name || item.slug}</div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* ── CREATE / PREVIEW PANEL ── */
                <div className="cuf-editor">
                  
                  {selectedCategoryObj && (
                    <div className="cuf-section">
                      <h4 className="cuf-section__title">Selected Category</h4>
                      <div className="cuf-preview">
                        <div className="cuf-preview__thumb">
                          <div className="cuf-preview__placeholder"><CategoryIcon size={24} /></div>
                        </div>
                        <div className="cuf-preview__info">
                          <p className="cuf-preview__filename">{selectedCategoryObj.name}</p>
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
                    <h4 className="cuf-section__title">{selectedCategoryObj ? 'Change / Create New Category' : 'Create New Category'}</h4>
                    <div className="cuf-upload-box">
                      
                      <div className="cuf-field">
                        <label>Name *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Smoothies" 
                          value={createName}
                          onChange={(e) => {
                            setCreateName(e.target.value)
                            if (!createSlug) {
                              setCreateSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
                            }
                          }}
                          disabled={isUploading}
                        />
                      </div>

                      <div className="cuf-field">
                        <label>Slug *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. smoothies" 
                          value={createSlug}
                          onChange={(e) => setCreateSlug(e.target.value)}
                          disabled={isUploading}
                        />
                      </div>
                      
                      <div className="cuf-field">
                        <label>Sub Text</label>
                        <textarea 
                          placeholder="Subtext displayed under the category tabs..." 
                          value={createSubText}
                          onChange={(e) => setCreateSubText(e.target.value)}
                          disabled={isUploading}
                          rows={3}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--theme-elevation-300)', background: 'var(--theme-elevation-50)', color: 'var(--theme-text)' }}
                        />
                      </div>

                      <button 
                        type="button" 
                        className={`cuf-btn cuf-btn--primary`} 
                        style={{ width: '100%', height: '48px', fontSize: '1rem' }}
                        onClick={handleCreate}
                        disabled={isUploading}
                      >
                        {isUploading ? <><Loader2 size={18} className="cuf-spin" /> Saving...</> : <><Plus size={18} /> Create Category</>}
                      </button>

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

export default CustomCategoryField