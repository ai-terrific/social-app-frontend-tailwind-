import { useSelector } from '@/store'

export function useUser() {
  const { user } = useSelector(store => store.auth)

  return user
}
