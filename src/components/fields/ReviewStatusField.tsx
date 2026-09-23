'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import { Clock, CheckCircle2, XCircle, ChevronDown } from 'lucide-react'

type Status = 'pending' | 'published' | 'rejected'

const STATUS_OPTIONS: { value: Status; label: string; icon: React.FC<any>; color: string; bg: string; border: string }[] = [
  {
    value: 'pending',
    label: 'Pending',
    icon: Clock,
    color: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
  },
  {
    value: 'published',
    label: 'Published',
    icon: CheckCircle2,
    color: '#15803d',
    bg: '#dcfce7',
    border: '#86efac',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    icon: XCircle,
    color: '#b91c1c',
    bg: '#fee2e2',
    border: '#fca5a5',
  },
]

export const ReviewStatusField: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<Status>({ path })
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const current = STATUS_OPTIONS.find((o) => o.value === value) ?? STATUS_OPTIONS[0]
  const CurrentIcon = current.icon

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', fontFamily: 'system-ui, sans-serif' }} ref={ref}>
      {/* Label */}
      <label
        style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--theme-text)',
          marginBottom: '6px',
        }}
      >
        Status <span style={{ color: '#ef4444' }}>*</span>
      </label>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          border: `1.5px solid ${current.border}`,
          background: current.bg,
          color: current.color,
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.18s ease',
          boxShadow: open ? `0 0 0 3px ${current.border}` : 'none',
        }}
      >
        <CurrentIcon size={17} strokeWidth={2.2} />
        <span style={{ flex: 1, textAlign: 'left' }}>{current.label}</span>
        <ChevronDown
          size={15}
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity: 0.7,
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'var(--theme-bg)',
            borderRadius: '10px',
            border: '1px solid var(--theme-border-color)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            animation: 'fadeInDown 0.15s ease',
          }}
        >
          <style>{`
            @keyframes fadeInDown {
              from { opacity:0; transform: translateY(-6px); }
              to   { opacity:1; transform: translateY(0); }
            }
          `}</style>

          {STATUS_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setValue(opt.value)
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '12px 16px',
                  background: isSelected ? opt.bg : 'transparent',
                  border: 'none',
                  borderLeft: isSelected ? `3px solid ${opt.color}` : '3px solid transparent',
                  color: isSelected ? opt.color : 'var(--theme-text)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 500,
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = opt.bg
                    e.currentTarget.style.color = opt.color
                    e.currentTarget.style.borderLeftColor = opt.color
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--theme-text)'
                    e.currentTarget.style.borderLeftColor = 'transparent'
                  }
                }}
              >
                <Icon size={16} strokeWidth={2.2} />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ReviewStatusField
