import { FC, useEffect, useState } from 'react'

import PostList from '@/components/Post/PostList'
import Typing from '@/components/Typing'
import { fetchPosts } from '@/services'
import { Post } from '@/types'
import { handleError } from '@/utils'
import { useSocket } from '@/hooks/useSocket'

const Feed: FC = () => {
  const socket = useSocket()
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = () => {
    if (!socket) return
    socket.emit('getPosts')
  }
  useEffect(() => {
    if (!socket) return
    try {
      //get post list
      getPosts()

      socket.on('getPosts', (data: Post[]) => {
        setPosts(data)
      })

      socket.on('postCreated', (data: { newPost: Post; message: string }) => {
        setPosts(prev => [data.newPost, ...prev])
      })
    } catch (err) {
      handleError(err)
    }
  }, [])

  return (
    <div className='mx-auto container p-5'>
      <Typing titles={[`Total ${posts.length} posts`]} />
      <PostList posts={posts} getPosts={getPosts} />
    </div>
  )
}

export default Feed
