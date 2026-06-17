import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'

import UserInfoItem from '@/components/UserInfoItem'
import { fetchUserById, setAvatar } from '@/services'
import { Profile } from '@/types'
import { handleError } from '@/utils'
import { useIsLoggedIn, useUser } from '@/hooks'
import { BASE_URL } from '@/configs'

const UserProfile: FC = () => {
  const { userId } = useParams()
  const isLoggedIn = useIsLoggedIn()
  const profile = useUser()
  const [user, setUser] = useState<Profile | null>(null)
  const [edit, setEdit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const followers = user?.followers ?? []
  const following = user?.following ?? []

  const fetchUser = async () => {
    try {
      const response = await fetchUserById(userId!)
      setUser(response.user)
    } catch (err) {
      handleError(err)
    }
  }
  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files || files.length === 0) {
      setSelectedFile(null)
      setPreviewUrl(null)
      return
    }

    if (files && files.length > 0) {
      setSelectedFile(files[0])
      setPreviewUrl(URL.createObjectURL(files[0]))
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('avatar', selectedFile)

    try {
      setLoading(true)
      await setAvatar(formData)
      setSelectedFile(null)
      setPreviewUrl(null)
      await fetchUser()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!previewUrl) return
    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='mx-auto container m-5'>
      <div className='lg:grid lg:grid-cols-4 gap-4 flex flex-col'>
        <div className='col-span'>
          <div className='flex lg:flex-col items-center gap-6 lg:gap-3 justify-center w-full text-white'>
            <div className='relative avatar bg-gray-500 text-white rounded-full max-sm:w-24 max-sm:h-24 w-36 h-36 flex items-center justify-center text-6xl font-bold'>
              {loading ? (
                <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin' />
              ) : user?.avatar || previewUrl ? (
                <img
                  src={previewUrl ? previewUrl : `${BASE_URL}/${user?.avatar}`}
                  alt='preview'
                  className='rounded-full'
                />
              ) : (
                user?.username.charAt(0)
              )}
              {isLoggedIn && profile?._id === user?._id && (
                <>
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    className='hidden'
                    id='avatar-upload'
                    onChange={handleFileChange}
                  />
                  <button
                    type='button'
                    className='absolute text-xs bg-white/20 hover:bg-white/30 p-2 flex items-center rounded-md h-6 absolute -bottom-4 -right-4'
                    onClick={previewUrl ? handleUpload : handleUploadButtonClick}
                  >
                    {previewUrl ? 'Upload' : 'Edit'}
                  </button>
                </>
              )}
            </div>
            <div className='flex flex-col gap-3 items-center'>
              <Link to={`/user/${user?._id}`} className='text-3xl font-bold hover:underline'>
                <span className='text-3xl font-bold'>{user?.username}</span>
              </Link>
              <div className='inline-flex gap-4'>
                <p>
                  <b>{user?.followers.length}</b> Followers
                </p>
                ·
                <p>
                  <b>{user?.following.length}</b> Following
                </p>
              </div>
              <p>{user?.email}</p>
              {isLoggedIn && profile?._id === user?._id && (
                <button
                  className='bg-white/20 hover:bg-white/30 w-full text-white py-1 px-2 rounded transition'
                  onClick={() => setEdit(prev => !prev)}
                >
                  {edit ? 'Save' : 'Edit Profile'}
                </button>
              )}
              {isLoggedIn && profile?._id === user?._id && edit && (
                <textarea
                  name='introduction'
                  id='introduction'
                  placeholder='About me'
                  rows={10}
                  autoFocus
                  required
                  className='w-full p-4 rounded-lg bg-white/10 text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 transition'
                />
              )}
            </div>
          </div>
        </div>
        <div className='col-span-3'>
          {isLoggedIn && profile?._id === user?._id && (
            <TabGroup>
              <TabList>
                <Tab className='relative focus:bg-gray-500 text-white px-4 py-2 border-t border-r border-l rounded-t-xl mr-4 mb-2 font-bold text-2xl hover:bg-white/30 transition'>
                  Followers
                  {followers.length > 0 && (
                    <span className='absolute bg-purple-700 text-green-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3'>
                      {followers.length}
                    </span>
                  )}
                </Tab>
                <Tab className='relative focus:bg-gray-500 text-white px-4 py-2 border-t border-r border-l rounded-t-xl mr-4 mb-2 font-bold text-2xl hover:bg-white/30 transition'>
                  Following
                  {following.length > 0 && (
                    <span className='absolute bg-purple-700 text-green-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3'>
                      {following.length}
                    </span>
                  )}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {followers.length > 0 ? (
                    followers.map(follower => <UserInfoItem key={follower._id} user={follower} />)
                  ) : (
                    <p className='text-gray-400'>No followers to display.</p>
                  )}
                </TabPanel>
                <TabPanel>
                  {following.length > 0 ? (
                    following.map(following => <UserInfoItem key={following._id} user={following} />)
                  ) : (
                    <p className='text-gray-400'>No followings to display.</p>
                  )}
                </TabPanel>
              </TabPanels>
            </TabGroup>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
