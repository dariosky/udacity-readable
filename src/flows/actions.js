export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST_SUCCEEDED = "FETCH_POST_SUCCEEDED"
export const FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED"

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORIES_SUCCEEDED = 'FETCH_CATEGORIES_SUCCEEDED'
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED'

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'

export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_CANCEL = 'EDIT_POST_CANCEL'
export const EDIT_POST_SAVE = 'EDIT_POST_SAVE'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAIL = 'EDIT_POST_FAIL'

export const SORT_BY = 'SORT_BY'
export const SORT_DIRECTION = 'SORT_DIRECTION'

export const CHANGE_POST = 'CHANGE_POST'
export const GET_COMMENTS_SUCCEEDED = 'GET_COMMENTS_SUCCEEDED'
export const GET_COMMENTS_FAILED = 'GET_COMMENTS_FAILED'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_SUCCEEDED = 'DELETE_COMMENT_SUCCEEDED'
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'

export const POST_COMMENT = 'POST_COMMENT'
export const POST_COMMENT_RESULT = 'POST_COMMENT_RESULT'

/* posts */
export function fetchPosts(category) {
  return {
    type: FETCH_POSTS,
    category: category || 'all',
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

export function changeCategory(category) {
  return {type: CHANGE_CATEGORY, category}
}


/* Sorting */
export function sortBy(method) {
  return {type: SORT_BY, method}
}

export function sortDirection(direction) {
  return {type: SORT_DIRECTION, direction}
}

/* Posts details */
export function newPostModal(post) {
  return {type: EDIT_POST, post}
}

export function cancelPostModal() {
  return {type: EDIT_POST_CANCEL}
}

export function savePostModal(post) {
  return {type: EDIT_POST_SAVE, post}
}

export function savePostSuccess(post) {
  return {type: EDIT_POST_SUCCESS, post}
}

export function savePostFailed(message) {
  return {type: EDIT_POST_FAIL, message}
}

export function changePost(postId) {
  return {type: CHANGE_POST, id: postId}
}

export function getCommentsSucceeded(comments) {
  return {type: GET_COMMENTS_SUCCEEDED, comments}
}

export function getCommentsFailed(message) {
  return {type: GET_COMMENTS_FAILED, message}
}

export function deleteComment(id) {
  return {type: DELETE_COMMENT, id}
}

export function deleteCommentSucceeded(comment) {
  return {type: DELETE_COMMENT_SUCCEEDED, comment}
}

export function deleteCommentFailed(message) {
  return {type: DELETE_COMMENT_FAILED, message}
}

export function postComment(comment) {
  return {type: POST_COMMENT, comment}
}

export function postCommentResult(result) {
  return {type: POST_COMMENT_RESULT, result}
}
