import { FC, useEffect, useState } from 'react'

import PostList from '@/components/Post/PostList'
import Typing from '@/components/Typing'
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
      <Typing titles={[`Total ${posts.length} posts`]} />
      <PostList posts={posts} getPosts={getPosts} />
    </div>
  )
}

export default Feed
