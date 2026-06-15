import { FC, useEffect, useState } from 'react'
import { ReactTyped } from 'react-typed'

import PostList from '@/components/Post/PostList'

import { fetchPosts } from '@/services'
import { Post } from '@/types'
import { handleError } from '@/utils'

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
      <PostList posts={posts} getPosts={getPosts} />
    </div>
  )
}

export default Feed
