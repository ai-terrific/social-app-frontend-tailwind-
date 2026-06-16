import { FC } from 'react'

import CreatePostForm from '@/components/CreatePost/Form'
import Typing from '@/components/Typing'

const CreatePost: FC = () => {
  return (
    <div className='mx-auto container m-5'>
      <Typing titles={['Type your post']} />
      <CreatePostForm />
    </div>
  )
}

export default CreatePost
