import { Suspense, useCallback, useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SimpleBarCore from 'simplebar-core'

import LoadingFallback from '@/components/Loading'
import Navbar from './Navbar'

const Layout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const scrollRef = useRef<SimpleBarCore | null>(null)

  const scrollToTop = useCallback(() => {
    const scrollElement = scrollRef.current?.getScrollElement()
    if (scrollElement) {
      scrollElement.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    scrollToTop()
  }, [pathname, navigate, scrollToTop])

  return (
    <div className='bg-gray-900 h-screen w-screen overflow-x-hidden'>
      <Navbar />

      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout
