import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { routers } from '@/configs'
import { useIsLoggedIn } from '@/hooks'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useIsLoggedIn()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to={routers.Login} replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default PrivateRoute
