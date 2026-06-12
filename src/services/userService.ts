import { API_ENDPOINTS } from '@/configs'
import apiRequest from '@/services/axios'
import { AllowUserRes, FetchUserRes, User } from '@/types'

export const fetchExploreUsers = async (): Promise<User[]> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.USER.EXPLORE,
    errorMessage: 'Exploration failed'
  })
}

export const followUser = async (userId: string): Promise<AllowUserRes> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.USER.FOLLOW(userId),
    errorMessage: 'Failed to follow user'
  })
}

export const unfollowUser = async (userId: string): Promise<AllowUserRes> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.USER.UNFOLLOW(userId),
    errorMessage: 'Failed to unfollow user'
  })
}

export const fetchUserById = async (userId: string): Promise<FetchUserRes> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.USER.GET(userId),
    errorMessage: 'Failed to get profile'
  })
}

export const fetchProfile = async (): Promise<FetchUserRes> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.USER.PROFILE,
    errorMessage: 'Failed to get profile'
  })
}
