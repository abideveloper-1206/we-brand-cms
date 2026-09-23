'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@payloadcms/ui'
import { usePathname, useRouter } from 'next/navigation'
import './admin-layout.css'

export const CustomHeader: React.FC = () => {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isEditPage, setIsEditPage] = useState(false)
  const [isListPage, setIsListPage] = useState(false)
  const [isCreatePage, setIsCreatePage] = useState(false)
  const [currentCollectionSlug, setCurrentCollectionSlug] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMediaListPage, setIsMediaListPage] = useState(false)

  // Track path changes to detect if on a document edit page or list page
  useEffect(() => {
    if (!pathname) return
    const segments = pathname.split('/').filter(Boolean)
    const collectionsIdx = segments.indexOf('collections')
    const globalsIdx = segments.indexOf('globals')

    // Edit page: /admin/collections/{slug}/{id} or /admin/globals/{slug}
    const isEdit =
      (collectionsIdx !== -1 && segments.length > collectionsIdx + 2) ||
      (globalsIdx !== -1 && segments.length > globalsIdx + 1)

    // List page: /admin/collections/{slug} (exactly 2 segments after admin)
    const isList = collectionsIdx !== -1 && segments.length === collectionsIdx + 2

    // Create page: /admin/collections/{slug}/create
    const isCreate =
      collectionsIdx !== -1 &&
      segments.length === collectionsIdx + 3 &&
      segments[collectionsIdx + 2] === 'create'

    const slug = collectionsIdx !== -1 ? segments[collectionsIdx + 1] : null

    setIsEditPage(isEdit && !isCreate)
    setIsListPage(isList)
    setIsCreatePage(isCreate)
    setCurrentCollectionSlug(slug)
    setIsMediaListPage(isList && slug === 'media')
    setIsEditing(false) // Default to read-only view mode when navigating

    if (isEdit && !isCreate) {
      document.body.classList.add('view-mode-active')
      document.body.classList.remove('create-page-active')
    } else if (isCreate) {
      document.body.classList.remove('view-mode-active')
      document.body.classList.add('create-page-active')
    } else {
      document.body.classList.remove('view-mode-active')
      document.body.classList.remove('create-page-active')
    }

    return () => {
      document.body.classList.remove('view-mode-active')
      document.body.classList.remove('create-page-active')
    }
  }, [pathname])

  // Intercept media list row clicks — navigate directly instead of opening drawer
  useEffect(() => {
    if (!isMediaListPage) return

    const handleMediaClick = (e: MouseEvent) => {
      // Find the closest table row or media card the user clicked
      const target = e.target as HTMLElement
      const row = target.closest('tr, .cell--link, .table__cell, [class*="cell"]')
      if (!row) return

      // Look for an anchor or data-id within the row
      const anchor = row.querySelector('a[href*="/admin/collections/media/"]') as HTMLAnchorElement | null
      if (anchor) {
        e.preventDefault()
        e.stopPropagation()
        router.push(anchor.getAttribute('href') || anchor.href)
        return
      }

      // Fallback: look for a link anywhere in clicked path
      const link = (e.composedPath() as HTMLElement[]).find(
        (el) => el.tagName === 'A' && (el as HTMLAnchorElement).href?.includes('/admin/collections/media/')
      ) as HTMLAnchorElement | undefined
      if (link) {
        e.preventDefault()
        e.stopPropagation()
        router.push(link.getAttribute('href') || link.href)
      }
    }

    document.addEventListener('click', handleMediaClick, true)
    return () => {
      document.removeEventListener('click', handleMediaClick, true)
    }
  }, [isMediaListPage, router])

  // Add body class for media list page to enable CSS rules
useEffect(() => {
  if (isMediaListPage) {
    document.body.classList.add('media-list-active')
  } else {
    document.body.classList.remove('media-list-active')
  }
}, [isMediaListPage])

// Detect precisely when a drawer is visibly open
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    const checkDrawer = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        // Target actual visible drawer content, open dialogs, or open modal portals to avoid false positives from closed/hidden parent wrappers
        const dialogs = Array.from(document.querySelectorAll('.drawer__content, [class*="drawer__content"], [data-state="open"], dialog[open], .modal, .cuf-drawer, #cuf-drawer-container'))
        const isVisible = dialogs.some(el => {
          const htmlEl = el as HTMLElement;
          const style = window.getComputedStyle(htmlEl);
          return style.display !== 'none' && style.opacity !== '0' && style.visibility !== 'hidden' && htmlEl.offsetWidth > 0;
        })

        // Only update state if value actually changed to prevent re-render loops
        setIsDrawerOpen(prev => {
          if (prev === isVisible) return prev
          if (isVisible) {
            document.body.classList.add('dialog-open-active')
          } else {
            document.body.classList.remove('dialog-open-active')
          }
          return isVisible
        })
      }, 150) // Debounce 150ms to batch rapid DOM changes
    }

    const observer = new MutationObserver(checkDrawer)
    // Only watch direct children of body for drawer additions, NOT subtree or attributes
    observer.observe(document.body, { childList: true, subtree: false })
    setTimeout(checkDrawer, 100)
    
    return () => {
      observer.disconnect()
      if (debounceTimer) clearTimeout(debounceTimer)
      document.body.classList.remove('dialog-open-active')
    }
  }, [])

  // Monitor save toasts to automatically turn off edit mode on success
  useEffect(() => {
    if (!isEditing) return

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const text = node.textContent || ''
            if (
              (text.includes('successfully') || text.includes('Saved') || text.includes('Created')) &&
              !text.includes('error') &&
              !text.includes('Failed')
            ) {
              setIsEditing(false)
              document.body.classList.add('view-mode-active')
            }
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: false })
    return () => observer.disconnect()
  }, [isEditing])

  const handleEdit = () => {
    setIsEditing(true)
    document.body.classList.remove('view-mode-active')
  }

  const handleSave = () => {
    // Find all potential dialogs/drawers and get the topmost visible one
    const dialogs = Array.from(document.querySelectorAll('.drawer, [class*="drawer"], dialog, [role="dialog"], .modal'))
    const activeDrawer = dialogs.reverse().find(el => {
      const style = window.getComputedStyle(el)
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && (el as HTMLElement).offsetParent !== null
    })

    if (activeDrawer) {
      const drawerForm = activeDrawer.querySelector('form')
      const drawerSaveBtn =
        activeDrawer.querySelector('button[type="submit"]') ||
        activeDrawer.querySelector('button#action-save') ||
        activeDrawer.querySelector('button[class*="btn--save"]') ||
        activeDrawer.querySelector('button[class*="save"]')
      
      if (drawerSaveBtn) {
        ;(drawerSaveBtn as HTMLButtonElement).click()
        return
      } else if (drawerForm) {
        drawerForm.requestSubmit()
        return
      }
    }

    // Force-show and click the main save button (it may be visually hidden by CSS)
    const saveBtn =
      (document.getElementById('action-save') as HTMLButtonElement | null) ||
      (document.querySelector('.doc-controls button[type="submit"]') as HTMLButtonElement | null) ||
      (document.querySelector('form button[type="submit"]') as HTMLButtonElement | null) ||
      (document.querySelector(
        '.doc-controls__controls-wrapper button.btn--style-primary',
      ) as HTMLButtonElement | null)

    if (saveBtn) {
      // Temporarily make it interactive regardless of CSS hiding
      const prevDisplay = saveBtn.style.display
      const prevVisibility = saveBtn.style.visibility
      const prevPointerEvents = saveBtn.style.pointerEvents
      saveBtn.style.display = 'inline-flex'
      saveBtn.style.visibility = 'visible'
      saveBtn.style.pointerEvents = 'auto'
      saveBtn.click()
      // Restore after a tick
      requestAnimationFrame(() => {
        saveBtn.style.display = prevDisplay
        saveBtn.style.visibility = prevVisibility
        saveBtn.style.pointerEvents = prevPointerEvents
      })
    }
  }

  const handleCreate = () => {
    if (currentCollectionSlug) {
      router.push(`/admin/collections/${currentCollectionSlug}/create`)
    }
  }

  const handleCancel = () => {
    window.location.reload()
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <>
    <header className="custom-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
         {/* Search Bar */}
         <div style={{ position: 'relative', width: '350px' }}>
            <input 
              type="text" 
              placeholder="Search documents, media..." 
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                borderRadius: '10px', 
                padding: '10px 16px 10px 42px', 
                color: 'white',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem',
                transition: 'border-color 0.2s, background 0.2s'
              }} 
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--orange-primary)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            />
            <SearchIcon style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
         </div>

         {/* Edit/Save/Cancel Controls */}
         {isEditPage && !isDrawerOpen && (
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
             {!isEditing ? (
               <button onClick={handleEdit} className="edit-toggle-btn btn-edit">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                 Edit Document
               </button>
             ) : (
               <>
                 <button onClick={handleSave} className="edit-toggle-btn btn-save">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                   Save Document
                 </button>
                 <button onClick={handleCancel} className="edit-cancel-btn">
                   Cancel
                 </button>
               </>
             )}
           </div>
         )}

         {/* Create New button — shown on collection list pages */}
         {isListPage && currentCollectionSlug && !isDrawerOpen && (
           <button onClick={handleCreate} className="edit-toggle-btn btn-create" style={{ marginLeft: '16px' }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
             Create New
           </button>
         )}

         {/* Save button — shown directly on create pages */}
         {isCreatePage && (
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
             <button onClick={handleSave} className="edit-toggle-btn btn-save">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
               Save
             </button>
             <button onClick={handleBack} className="edit-cancel-btn">
               Discard
             </button>
           </div>
         )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ color: '#888', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'}>
          <BellIcon />
        </div>
        <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{user?.email?.split('@')[0]}</span>
            <span style={{ color: 'var(--orange-primary)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Admin</span>
          </div>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--orange-gradient)', padding: '2px' }}>
             <div style={{ width: '100%', height: '100%', borderRadius: '10px', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserIcon />
             </div>
          </div>
        </div>
      </div>
    </header>
      {/* Floating Back Button — left side of header, visible on all non-dashboard pages */}
      {pathname && pathname !== '/admin' && !isDrawerOpen && (
        <button onClick={handleBack} className="floating-back-btn" title="Go back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      <div className="floating-edit-toggle">
        {isEditPage && !isDrawerOpen && (
          !isEditing ? (
            <button onClick={handleEdit} className="edit-toggle-btn btn-edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              Edit Document
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="edit-toggle-btn btn-save">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Save Document
              </button>
              <button onClick={handleCancel} className="edit-cancel-btn">Cancel</button>
            </>
          )
        )}
        {/* Floating Create New button on list pages */}
        {/* {isListPage && currentCollectionSlug && (
          <button onClick={handleCreate} className="edit-toggle-btn btn-create">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create New
          </button>
        )} */}
        {/* Floating Save button on create pages */}
        {isCreatePage && !isDrawerOpen && (
          <>
            <button onClick={handleSave} className="edit-toggle-btn btn-save">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save
            </button>
            <button onClick={handleBack} className="edit-cancel-btn">Discard</button>
          </>
        )}
      </div>
      </>
  )
}

const SearchIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
)

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
)
