import { dispatch, logout } from '@/store'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(logout())
    navigate('/')
  }

  return logoutUser
}
