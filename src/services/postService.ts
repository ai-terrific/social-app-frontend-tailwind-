import { API_ENDPOINTS } from '@/configs'
import apiRequest from '@/services/axios'
import { Post, PostCreateRes, votePostRes } from '@/types'

export const createPost = async (data: Post): Promise<PostCreateRes> => {
  return apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.POST.CREATE,
    data,
    errorMessage: 'Failed to create post'
  })
}

export const fetchPosts = async (): Promise<Post[]> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.POST.GET_ALL,
    errorMessage: 'Failed to get posts'
  })
}

export const upVotePost = async (postId: string): Promise<votePostRes> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.POST.UPVOTE(postId),
    errorMessage: 'Failed to upvote post'
  })
}

export const downVotePost = async (postId: string): Promise<votePostRes> => {
  return apiRequest({
    method: 'GET',
    url: API_ENDPOINTS.POST.DOWNVOTE(postId),
    errorMessage: 'Failed to downvote post'
  })
}

export const commentOnPost = async (postId: string, data: { content: string }): Promise<votePostRes> => {
  return apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.POST.COMMENT(postId),
    data,
    errorMessage: 'Failed to comment on post'
  })
}
