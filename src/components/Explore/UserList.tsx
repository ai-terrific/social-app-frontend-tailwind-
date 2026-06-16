import { FC, useEffect, useState, useCallback } from 'react'

import UserItem from '@/components/Explore/UserItem'
import { fetchExploreUsers, followUser, unfollowUser } from '@/services/userService'
import { User } from '@/types'
import { handleError } from '@/utils'

const UserList: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const handleFollow = useCallback(async (userId: string) => {
    try {
      const response = await followUser(userId)
      if (!response.users) return
      setUsers(response.users)
    } catch (err) {
      handleError(err)
    }
  }, [])

  const handleUnfollow = useCallback(async (userId: string) => {
    try {
      const response = await unfollowUser(userId)
      if (!response.users) return
      setUsers(response.users)
    } catch (err) {
      handleError(err)
    }
  }, [])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetchExploreUsers()
      setUsers(response)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      {loading ? (
        <p className='text-white text-2xl font-bold'>loading...</p>
      ) : (
        <ul className='grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {users.map(user => (
            <UserItem key={user.email} user={user} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
          ))}
        </ul>
      )}
    </>
  )
}

export default UserList
