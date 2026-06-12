import { FC, useEffect, useState } from 'react'

import Posts from '@/components/Posts'
import { fetchPosts } from '@/services'
import { Post } from '@/types'
import { handleError } from '@/utils'
import { ReactTyped } from 'react-typed'

const Feed: FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = async () => {
    try {
      const response = await fetchPosts()
      setPosts(response)
    } catch (err) {
      handleError(err)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='mx-auto container m-5'>
      <ReactTyped
        className='text-4xl font-bold text-white'
        showCursor={false}
        strings={[`Total ${posts.length} posts`]}
        typeSpeed={40}
        backSpeed={60}
      />
      <ul className='mt-4'>
        {posts.length > 0 && posts.map(post => <Posts key={post._id} post={post} getPost={getPosts} />)}
      </ul>
    </div>
  )
}

export default Feed
