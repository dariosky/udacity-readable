export const FETCH_POSTS = 'FETCH_POSTS'

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
  }
}

export  function postFetchSuccess(posts) {
  return {type: "POST_FETCH_SUCCEEDED", posts: posts}
}

export  function postFetchFail(message) {
  return {type: "POST_FETCH_FAILED", message: message}
}
