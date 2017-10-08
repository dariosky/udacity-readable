export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST_SUCCEEDED = "FETCH_POST_SUCCEEDED"
export const FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED"

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORIES_SUCCEEDED = 'FETCH_CATEGORIES_SUCEEDED'
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED'

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
  }
}

export function postFetchSuccess(posts) {
  return {type: FETCH_POST_SUCCEEDED, posts}
}

export function postFetchFail(message) {
  return {type: FETCH_POSTS_FAILED, message}
}

/* categories */
export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
  }
}

export function categoriesFetchSuccess(categories) {
  return {type: FETCH_CATEGORIES_SUCCEEDED, categories}
}

export function categoriesFetchFailed(message) {
  return {type: FETCH_CATEGORIES_FAILED, message}
}
