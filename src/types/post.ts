import { User } from './user'
import Comment from '../components/NavbarItem'

export interface Comment {
  user: User
  content: string
  _id?: string
  createdAt?: Date
}

export interface Post {
  _id?: string
  title: string
  content: string
  user?: User
  upVotes?: string[]
  downVotes?: string[]
  comments?: Comment[]
  createdAt?: string
}

export interface PostCreateRes {
  data: Post | null
  status: string
}

export interface votePostRes {
  message: string
}
