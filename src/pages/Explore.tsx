import { FC, useEffect, useState } from 'react'
import { ReactTyped } from 'react-typed'

import UserItem from '@/components/UserItem'
import { fetchExploreUsers, followUser, unfollowUser } from '@/services/userService'
import { User } from '@/types'
import { handleError } from '@/utils'

const Explore: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const handleFollow = async (userId: string) => {
    try {
      const response = await followUser(userId)
      if (!response.users) return
      setUsers(response.users)
    } catch (err) {
      handleError(err)
    }
  }

  const handleUnfollow = async (userId: string) => {
    try {
      const response = await unfollowUser(userId)
      if (!response.users) return
      setUsers(response.users)
    } catch (err) {
      handleError(err)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetchExploreUsers()
      setUsers(response)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='mx-auto container p-5'>
      <ReactTyped
        className='text-4xl font-bold text-white'
        strings={['Explore Users']}
        typeSpeed={40}
        backSpeed={60}
        cursorChar=''
      />
      {loading ? (
        <p className='text-white'>loading...</p>
      ) : (
        <ul className='grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {users.map(user => (
            <UserItem key={user.email} user={user} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Explore
