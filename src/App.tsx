import { RouterProvider } from 'react-router-dom'

import routes from '@/routes'
import { ThemedToastContainer } from './components/ThemedToastContainer'

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ThemedToastContainer />
    </>
  )
}
