'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the first tab (Guide Review) to match demo behavior
    router.replace('/dashboard/review')
  }, [router])

  return null
}