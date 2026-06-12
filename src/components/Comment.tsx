import { Comment } from '@/types'
import { formatDistance } from 'date-fns'
import { FC } from 'react'

interface CommentProps {
  comment: Comment
}

const CommentItem: FC<CommentProps> = ({ comment }) => {
  return (
    <li className='bg-white/10 p-3 mb-2 rounded-lg'>
      <p className='break-all'>{comment.content}</p>
      <div className='flex justify-end'>
        <span className='text-sm text-gray-400 mr-3'>
          {formatDistance(new Date(comment.createdAt!), Date.now(), { addSuffix: true })}
        </span>
        <a href={`/user/${comment.user?._id}`} className='text-sm text-white font-bold hover:underline'>
          {comment.user?.username}
        </a>
      </div>
    </li>
  )
}

export default CommentItem
