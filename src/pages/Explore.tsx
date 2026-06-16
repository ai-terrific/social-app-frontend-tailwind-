import { FC } from 'react'
import { ReactTyped } from 'react-typed'

import UserList from '@/components/Explore/UserList'

const Explore: FC = () => {
  return (
    <div className='mx-auto container p-5'>
      <ReactTyped
        className='text-4xl font-bold text-white'
        strings={['Explore Users']}
        showCursor={false}
        typeSpeed={40}
        backSpeed={60}
      />
      <UserList />
    </div>
  )
}

export default Explore
