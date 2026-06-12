import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ReactTyped } from 'react-typed'
import { toast } from 'react-toastify'

import { createPost } from '@/services'
import { Post } from '@/types'
import { handleError } from '@/utils'

const CreatePost: FC = () => {
  const [formData, setFormData] = useState<Post>({
    title: '',
    content: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await createPost(formData)
      toast.success(response.status, { hideProgressBar: true })
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mx-auto container m-5'>
      <ReactTyped
        className='text-4xl font-bold text-white'
        showCursor={false}
        strings={['Type your post']}
        typeSpeed={40}
        backSpeed={60}
      />
      <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
        <input
          id='title'
          name='title'
          type='text'
          placeholder='Title'
          onChange={handleChange}
          required
          autoComplete='title'
          className='w-full p-4 rounded-lg bg-white/10 text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 transition'
        />
        <textarea
          name='content'
          id='content'
          placeholder='whats on your mind'
          rows={5}
          required
          value={formData.content}
          className='w-full p-4 rounded-lg bg-white/10 text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 transition'
          onChange={e => setFormData({ ...formData, content: e.target.value })}
        />
        <button
          className='bg-blue-500 w-full hover:bg-blue-600 text-white py-2 px-4 rounded transition'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost
