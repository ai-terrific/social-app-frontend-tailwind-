import { FC } from 'react'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'

import { Comment } from '@/types'

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
        <Link to={`/user/${comment.user?._id}`} className='text-sm text-white font-bold hover:underline'>
          {comment.user?.username}
        </Link>
      </div>
    </li>
  )
}

export default CommentItem
