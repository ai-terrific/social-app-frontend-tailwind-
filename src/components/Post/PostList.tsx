import { FC } from 'react'

import PostItem from '@/components/Post/PostItem'

import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  getPosts: () => void
}

const PostList: FC<PostListProps> = ({ posts, getPosts }) => {
  return (
    <ul className='mt-4'>
      {posts.length > 0 && posts.map(post => <PostItem key={post._id} post={post} getPosts={getPosts} />)}
    </ul>
  )
}

export default PostList
