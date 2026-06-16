export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `user/register`,
    LOGIN: `user/login`
  },
  USER: {
    EXPLORE: `user/explore`,
    FOLLOW: (userId: string) => `user/${userId}/follow`,
    UNFOLLOW: (userId: string) => `user/${userId}/unfollow`,
    GET: (userId: string) => `user/${userId}`
  },
  POST: {
    CREATE: 'post/create',
    GET_ALL: 'post',
    UPVOTE: (postId: string) => `post/${postId}/upvote`,
    DOWNVOTE: (postId: string) => `post/${postId}/downvote`,
    COMMENT: (postId: string) => `post/${postId}/comment`
  }
}
