import { API_ENDPOINTS } from '@/configs'
import apiRequest from '@/services/axios'
import { EmailPassword, LoginUserRes, RegisterUserRes, UserForm } from '@/types'

export const signUpUser = async (data: UserForm): Promise<RegisterUserRes> => {
  return apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.AUTH.REGISTER,
    data,
    errorMessage: 'Registration failed'
  })
}

export const loginUser = async (data: EmailPassword): Promise<LoginUserRes> => {
  return apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.AUTH.LOGIN,
    data,
    errorMessage: 'Login failed'
  })
}
