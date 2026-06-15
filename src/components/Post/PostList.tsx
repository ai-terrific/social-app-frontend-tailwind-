import { FC } from 'react'

import Posts from '@/components/Posts'

import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  getPosts: () => Promise<void>
}

const PostList: FC<PostListProps> = ({ posts, getPosts }) => {
  return (
    <ul className='mt-4'>
      {posts.length > 0 && posts.map(post => <Posts key={post._id} post={post} getPosts={getPosts} />)}
    </ul>
  )
}

export default PostList
