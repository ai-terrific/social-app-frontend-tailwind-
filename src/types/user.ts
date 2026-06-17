import Entity from './entity'

interface Email {
  email: string
}

export interface EmailPassword extends Email {
  password: string
}

export interface User extends Entity {
  _id: string
  email: string
  username: string
  avatar: string
  followers: string[]
  following: string[]
}

export interface Profile extends Entity {
  _id: string
  email: string
  username: string
  avatar: string
  followers: User[]
  following: User[]
}

export interface FetchUserRes {
  user: Profile
  message?: string
}

export interface AllowUserRes {
  users?: User[]
  message: string
}
