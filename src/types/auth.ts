import { User } from './user'

export interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token: string | null
}

export interface LoginUserRes {
  user: User | null
  token: string
  message?: string
}

export interface RegisterUserRes {
  user?: User
  message?: string
}

export interface UserForm {
  email: string
  username: string
  password: string
}
