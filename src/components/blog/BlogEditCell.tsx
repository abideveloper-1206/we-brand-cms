'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useConfig } from '@payloadcms/ui'
import Swal from 'sweetalert2'
import './styles.css'

export const BlogEditCell: React.FC<{ rowData: any }> = ({ rowData }) => {
  const router = useRouter()
  const { config } = useConfig()
  const adminRoute = config?.routes?.admin || '/admin'

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`${adminRoute}/collections/blogs/${rowData.id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FAAD03',
      cancelButtonColor: '#121212',
      confirmButtonText: 'Yes, delete it!',
      background: '#1a1a1a',
      color: '#fff',
      iconColor: '#FAAD03'
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/blogs/${rowData.id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your post has been deleted.',
            icon: 'success',
            confirmButtonColor: '#FAAD03',
            background: '#1a1a1a',
            color: '#fff'
          }).then(() => {
            window.location.reload()
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error deleting post',
            icon: 'error',
            confirmButtonColor: '#FAAD03',
            background: '#1a1a1a',
            color: '#fff'
          })
        }
      } catch (err) {
        console.error(err)
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonColor: '#FAAD03',
          background: '#1a1a1a',
          color: '#fff'
        })
      }
    }
  }

  if (!rowData || !rowData.id) return null

  return (
    <div className="blog-cell-actions" onClick={(e) => e.stopPropagation()}>
      <button 
        className="view-action-btn"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          router.push(`${adminRoute}/collections/blogs/${rowData.id}/view`)
        }}
        title="View"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>

      <button 
        className="edit-action-btn"
        onClick={handleEdit}
        title="Edit"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>

      <button 
        className="delete-action-btn"
        onClick={handleDelete}
        title="Delete"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  )
}

export default BlogEditCell
