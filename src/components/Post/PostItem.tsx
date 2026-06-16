import { FC, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react'
import { formatDistance } from 'date-fns'

import { commentOnPost, upVotePost, downVotePost } from '@/services'
import { Post } from '@/types'
import { handleError } from '@/utils'
import { useIsLoggedIn } from '@/hooks'
import CommentItem from './Comment'

interface PostItemProps {
  post: Post
  getPosts: () => Promise<void>
}

const PostItem: FC<PostItemProps> = ({ post, getPosts }) => {
  const isLoggedIn = useIsLoggedIn()
  const upVotesCount = post.upVotes?.length ?? 0
  const downVotesCount = post.downVotes?.length ?? 0
  const comments = post.comments ?? []

  const [viewComments, setViewComments] = useState<boolean>(false)

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const commentInput = e.currentTarget.elements.namedItem('comment') as HTMLInputElement | null

    if (!commentInput || !post._id) return

    try {
      const content = commentInput.value

      const response = await commentOnPost(post._id, { content })
      commentInput.value = ''
      getPosts()
      setViewComments(true)
      toast.success(response.message, { hideProgressBar: true })
    } catch (err) {
      handleError(err)
    }
  }

  const upVote = async (postId?: string) => {
    if (!postId) return
    try {
      const response = await upVotePost(postId)
      getPosts()
      toast.success(response.message, { hideProgressBar: true })
    } catch (err) {
      handleError(err)
    }
  }

  const downVote = async (postId?: string) => {
    if (!postId) return
    try {
      const response = await downVotePost(postId)
      getPosts()
      toast.success(response.message, { hideProgressBar: true })
    } catch (err) {
      handleError(err)
    }
  }

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <li
      className={`card text-white p-6 border-gray-600 border rounded-2xl shadow-md mb-6 bg-white/10 transition-opacity ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='flex gap-4'>
        <h3 className='text-2xl break-all'>{post.title}</h3>
        <div className='grow' />
        <span className='text-sm text-gray-400'>
          {formatDistance(new Date(post.createdAt!), Date.now(), { addSuffix: true })}
        </span>
        <a href={`/user/${post.user?._id}`} className='text-sm text-white font-bold hover:underline'>
          {post.user?.username}
        </a>
      </div>
      <p className='text-base text-gray-400 p-4 break-all'>{post.content}</p>
      <div className='flex items-center'>
        <ThumbsUp
          size={16}
          className='mr-2 animate-bounce inline-block cursor-pointer'
          onClick={() => upVote(post._id)}
        />
        <span>{upVotesCount}</span>
        <ThumbsDown size={16} className='cursor-pointer ml-4 mr-2' onClick={() => downVote(post._id)} />
        <span>{downVotesCount}</span>
        <span className='grow' />
        <MessageCircleMore size={16} className='cursor-pointer mr-2' />
        <span className='cursor-pointer' onClick={() => setViewComments(view => !view)}>
          {comments.length ? comments.length : 'No'} comments
        </span>
      </div>
      {isLoggedIn && (
        <form onSubmit={handleComment} className='mt-4 flex gap-2'>
          <input
            type='text'
            name='comment'
            required
            placeholder='Add the comment'
            className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
          />
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition' type='submit'>
            Comment
          </button>
        </form>
      )}
      {viewComments && (
        <ul className='mt-4'>
          {comments.map(comment => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default PostItem
