import { FC } from 'react'
import { ReactTyped } from 'react-typed'
import CreatePostForm from '@/components/CreatePost/Form'

const CreatePost: FC = () => {
  return (
    <div className='mx-auto container m-5'>
      <ReactTyped
        className='text-4xl font-bold text-white'
        showCursor={false}
        strings={['Type your post']}
        typeSpeed={40}
        backSpeed={60}
      />
      <CreatePostForm />
    </div>
  )
}

export default CreatePost
