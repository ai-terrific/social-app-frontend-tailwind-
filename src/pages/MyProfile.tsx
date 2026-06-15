import { FC, useEffect, useState } from 'react'

import UserInfoItem from '@/components/UserInfoItem'

import { fetchProfile } from '@/services'
import { Profile } from '@/types'
import { handleError } from '@/utils'

const MyProfile: FC = () => {
  const [user, setUser] = useState<Profile | null>(null)

  const fetchUser = async () => {
    try {
      const response = await fetchProfile()
      setUser(response.user)
    } catch (err) {
      handleError(err)
    }
  }

  const followers = user?.followers ?? []
  const following = user?.following ?? []

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='mx-auto container m-5'>
      <div className='lg:grid lg:grid-cols-4 gap-4 flex flex-col'>
        <div className='col-span'>
          <div className='flex lg:flex-col items-center gap-6 lg:gap-3 justify-center w-full text-white'>
            <span className='avatar bg-gray-500 text-white rounded-full max-sm:w-24 max-sm:h-24 w-36 h-36 flex items-center justify-center text-6xl font-bold'>
              {user?.username.charAt(0)}
            </span>
            <div className='flex flex-col gap-3 items-center'>
              <a href={`/user/${user?._id}`} className='text-3xl font-bold hover:underline'>
                <span className='text-3xl font-bold'>{user?.username}</span>
              </a>
              <div className='inline-flex gap-4'>
                <p>
                  <b>{user?.followers.length}</b> Followers
                </p>
                <p>
                  <b>{user?.following.length}</b> Following
                </p>
              </div>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
        <div className='col-span-3'>
          <h3 className='text-3xl text-white font-bold my-4'>Followers</h3>
          {followers.length > 0 ? (
            followers.map(follower => <UserInfoItem key={follower._id} user={follower} />)
          ) : (
            <p className='text-gray-400'>No followers to display.</p>
          )}

          <h3 className='text-3xl text-white font-bold mb-4'>Following</h3>
          {following.length > 0 ? (
            following.map(following => <UserInfoItem key={following._id} user={following} />)
          ) : (
            <p className='text-gray-400'>No followings to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
