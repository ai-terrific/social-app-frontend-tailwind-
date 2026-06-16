import { FC } from 'react'

import UserList from '@/components/Explore/UserList'
import Typing from '@/components/Typing'

const Explore: FC = () => {
  return (
    <div className='mx-auto container p-5'>
      <Typing titles={['Explore Users']} />
      <UserList />
    </div>
  )
}

export default Explore
