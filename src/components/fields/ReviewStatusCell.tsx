'use client'

import React from 'react'
import { Clock, CheckCircle2, XCircle } from 'lucide-react'

const STATUS_MAP: Record<string, { label: string; Icon: React.FC<any>; color: string; bg: string; border: string }> = {
  pending: {
    label: 'Pending',
    Icon: Clock,
    color: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
  },
  published: {
    label: 'Published',
    Icon: CheckCircle2,
    color: '#15803d',
    bg: '#dcfce7',
    border: '#86efac',
  },
  rejected: {
    label: 'Rejected',
    Icon: XCircle,
    color: '#b91c1c',
    bg: '#fee2e2',
    border: '#fca5a5',
  },
}

export const ReviewStatusCell: React.FC<{ cellData: string }> = ({ cellData }) => {
  const config = STATUS_MAP[cellData] ?? STATUS_MAP['pending']
  const { label, Icon, color, bg, border } = config

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px 3px 7px',
        borderRadius: '20px',
        background: bg,
        border: `1px solid ${border}`,
        color,
        fontSize: '0.78rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={13} strokeWidth={2.4} />
      {label}
    </span>
  )
}

export default ReviewStatusCell
