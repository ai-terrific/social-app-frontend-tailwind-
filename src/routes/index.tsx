import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { routers } from '@/configs'
import MainLayout from '@/layout'

import PrivateRoute from './PrivateRoute'

const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Explore = lazy(() => import('@/pages/Explore'))
const Create = lazy(() => import('@/pages/CreatePost'))
const Feed = lazy(() => import('@/pages/Feed'))
const UserProfile = lazy(() => import('@/pages/UserProfile'))
const MyProfile = lazy(() => import('@/pages/MyProfile'))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: routers.Feed,
        element: <Feed />
      },
      {
        path: routers.Home,
        element: <Explore />
      },
      {
        path: routers.Login,
        element: <Login />
      },
      {
        path: routers.Register,
        element: <Register />
      },
      {
        path: routers.USERINFO,
        element: <UserProfile />
      },
      {
        path: routers.NotFound,
        element: <NotFound />
      }
    ]
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: routers.Profile,
        element: <MyProfile />
      },
      {
        path: routers.Create,
        element: <Create />
      },
      {
        path: routers.NotFound,
        element: <NotFound />
      }
    ]
  }
])

export default routes
