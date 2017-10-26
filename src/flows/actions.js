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

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_SUCCEEDED = 'DELETE_COMMENT_SUCCEEDED'
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'

export const POST_COMMENT = 'POST_COMMENT'
export const POST_COMMENT_RESULT = 'POST_COMMENT_RESULT'

export const POST_DELETE = 'POST_DELETE'
export const DELETE_POST_RESULT = 'DELETE_POST_RESULT'

export const VOTE_POST = 'VOTE_POST'
export const VOTE_POST_RESULT = 'VOTE_POST_RESULT'

export const VOTE_COMMENT = 'VOTE_COMMENT'
export const VOTE_COMMENT_RESULT = 'VOTE_COMMENT_RESULT'
export const UP_VOTE = 'upVote'
export const DOWN_VOTE = 'downVote'

export const EDIT_COMMENT = 'EDIT_COMMENT'
export const EDIT_COMMENT_RESULT = 'EDIT_COMMENT_RESULT'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS'

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

export function deletePost(postId) {
  return {type: POST_DELETE, postId}
}

export function deletePostResult(result) {
  return {type: DELETE_POST_RESULT, result}
}

export function votePost(postId, vote) {
  return {type: VOTE_POST, postId, vote}
}

export function votePostResult(result) {
  return {type: VOTE_POST_RESULT, result}
}

export function voteComment(commentId, vote) {
  return {type: VOTE_COMMENT, commentId, vote}
}

export function voteCommentResult(result) {
  return {type: VOTE_COMMENT_RESULT, result}
}

export function editComment(commentId, body) {
  return {type: EDIT_COMMENT, commentId, body}
}

export function editCommentResult(result) {
  return {type: EDIT_COMMENT_RESULT, result}
}

export function getPostComments(postId) {
  // request for the comments of a post
  return {type: GET_POST_COMMENTS, postId}
}

export function setPostComments(postId, comments) {
  // got the comments of a post
  return {type: SET_POST_COMMENTS, postId, comments}
}
