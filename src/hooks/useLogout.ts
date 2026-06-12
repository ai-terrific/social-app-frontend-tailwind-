import { dispatch, logout } from '@/store'

export function useLogout() {
  const logoutUser = () => {
    dispatch(logout())
  }

  return logoutUser
}
