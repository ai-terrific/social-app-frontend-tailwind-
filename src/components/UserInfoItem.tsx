import { FC } from 'react'
import { User } from '@/types'

interface UserInformationProps {
  user: User
}

const UserInfoItem: FC<UserInformationProps> = ({ user }) => {
  return (
    <div key={user._id} className='card text-white p-4 rounded-lg shadow-md mb-4 bg-white/10 flex gap-4 items-center'>
      <span className='avatar bg-gray-500 text-white rounded-full w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center text-lg font-bold'>
        {user?.username.charAt(0)}
      </span>
      <div className='flex flex-col gap-1'>
        <a href={`/user/${user._id}`} className='text-3xl font-bold hover:underline'>
          <span className='text-2xl font-bold'>{user?.username}</span>
        </a>
        <p className='text-gray-500'>{user?.email}</p>
        <div className='inline-flex gap-4 max-sm:text-xs items-center'>
          <img src='/people.svg' alt='people' />
          <p>
            <b>{user?.followers?.length ?? 0}</b> Followers
          </p>
          <p>
            <b>{user?.following?.length ?? 0}</b> Following
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserInfoItem
