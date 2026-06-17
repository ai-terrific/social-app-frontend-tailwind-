import { RouterProvider } from 'react-router-dom'

import routes from '@/routes'

import { ThemedToastContainer } from './components/ThemedToastContainer'
import { SocketProvider } from './contexts/SocketProvider'

export default function App() {
  return (
    <SocketProvider>
      <RouterProvider router={routes} />
      <ThemedToastContainer />
    </SocketProvider>
  )
}
