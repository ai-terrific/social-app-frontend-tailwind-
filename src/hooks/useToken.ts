import { useSelector } from '@/store'

export function useToken() {
  const { token } = useSelector(store => store.auth)

  return token
}
