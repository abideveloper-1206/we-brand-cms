'use client'
import { useRouter } from 'next/navigation'
import { useConfig } from '@payloadcms/ui'
import { useEffect } from 'react'

export const DashboardRedirect = () => {
  const { config } = useConfig()
  const router = useRouter()
  
  useEffect(() => {
    if (config) {
      // Find the first global or collection that is not auth/media
      const firstGlobal = config.globals?.[0]?.slug;
      const firstCollection = config.collections?.filter(c => c.slug !== 'users' && c.slug !== 'media')?.[0]?.slug;
      
      if (firstGlobal) {
        router.replace(`/admin/globals/${firstGlobal}`)
      } else if (firstCollection) {
        router.replace(`/admin/collections/${firstCollection}`)
      } else {
        router.replace('/admin/account')
      }
    }
  }, [config, router])

  return null
}
