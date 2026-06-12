import { FC, useEffect, useState } from 'react'

import { useIsLoggedIn, useUser } from '@/hooks'
import { User } from '@/types'

interface UserItemProps {
  user: User
  handleFollow: (userId: string) => Promise<void>
  handleUnfollow: (userId: string) => Promise<void>
}

const UserItem: FC<UserItemProps> = ({ user, handleFollow, handleUnfollow }) => {
  const isLoggedIn = useIsLoggedIn()
  const profile = useUser()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <li
      className={`card text-white p-6 rounded-lg shadow-md flex gap-4 bg-white/10 hover:bg-white/20 hover:-translate-y-1 transition-all ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='flex flex-col items-center gap-3 justify-center w-full'>
        <span className='avatar bg-gray-500 text-purple rounded-full lg:w-36 lg:h-36 w-24 h-24 flex items-center justify-center text-6xl font-bold'>
          {user.username.charAt(0)}
        </span>
        <a href={`/user/${user._id}`} className='text-3xl font-bold hover:underline'>
          <span className='text-3xl font-bold'>{user.username}</span>
        </a>
        {isLoggedIn && profile?._id && user.followers.includes(profile._id) && (
          <button
            className='bg-red-500 hover:bg-red-600 w-full text-white py-1 px-2 rounded transition'
            onClick={() => handleUnfollow(user._id)}
          >
            Unfollow
          </button>
        )}
        {isLoggedIn && profile?._id && !user.followers.includes(profile._id) && (
          <button
            className='bg-blue-500 hover:bg-blue-600 w-full text-white py-1 px-2 rounded transition'
            onClick={() => handleFollow(user._id)}
          >
            Follow
          </button>
        )}
        <div className='inline-flex gap-4'>
          <p>
            <b>{user.followers.length}</b> Followers
          </p>
          <p>
            <b>{user.following.length}</b> Following
          </p>
        </div>
        <p>{user.email}</p>
      </div>
    </li>
  )
}

export default UserItem
