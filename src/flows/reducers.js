import {combineReducers} from 'redux'

import {
  CHANGE_CATEGORY,
  CHANGE_POST,
  DELETE_COMMENT_SUCCEEDED,
  DELETE_POST_RESULT, EDIT_COMMENT_RESULT,
  EDIT_POST,
  EDIT_POST_CANCEL,
  EDIT_POST_FAIL,
  EDIT_POST_SUCCESS,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCEEDED,
  FETCH_POST_SUCCEEDED,
  FETCH_POSTS,
  FETCH_POSTS_FAILED,
  GET_COMMENTS_SUCCEEDED,
  POST_COMMENT_RESULT,
  SORT_BY,
  SORT_DIRECTION, VOTE_COMMENT_RESULT,
  VOTE_POST_RESULT,
} from './actions'

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS :
      return {
        ...state,
        status: 'downloading',
        category: action.category,
        posts: [],
      }
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        status: 'error',
        message: 'Cannot get posts from API, is it running? ' + action.message,
        posts: [],
      }
    case FETCH_POST_SUCCEEDED:
      return {
        ...state,
        message: '',
        status: 'success',
        posts: action.posts,
      }

    case EDIT_POST:
      const {post} = action
      return {
        ...state,
        edit: post, // edit a post
      }
    case EDIT_POST_CANCEL: {
      const {edit: deleted, ...rest} = state
      return rest
    }
    case EDIT_POST_SUCCESS: {// add the post and close the edit modal
      const {edit: deleted, ...rest} = state
      return {
        ...rest,
        posts: [...state.posts, action.post],
      }
    }

    case EDIT_POST_FAIL:
      return {
        ...state,
        status: 'error',
        message: 'Something went wrong saving the POST' + action.message,
      }

    case DELETE_POST_RESULT: {
      const {result} = action
      if (result.success) return {
        ...state,
        posts: state.posts.filter(post => post.id !== result.post.id),
      }
      else {
        return state
      }
    }

    case VOTE_POST_RESULT: {
      const {result} = action
      if (result.success) {
        const rest = state.posts.filter(
          post => post.id !== result.post.id,
        )
        return {
          ...state,
          posts: [
            ...rest,
            result.post,
          ],
        }
      }
      else {
        return state
      }
    }

    default :
      return state
  }
}

function categories(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        status: 'downloading',
        categories: [],
      }
    case FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        status: 'error',
        message: 'Cannot talk with API, is it running? ' + action.message,
        categories: [],
      }

    case FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        status: 'success',
        categories: action.categories,
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        current: action.category,
      }
    default:
      return state
  }
}

function options(state = {
  sort: 'vote',
  sortDirection: 'desc',
}, action) {
  switch (action.type) {
    case SORT_BY:
      return {
        ...state,
        sort: action.method,
      }
    case SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.direction,
      }
    default:
      return state
  }
}

function postDetail(state = {id: null}, action) {
  switch (action.type) {
    case CHANGE_POST:
      return {
        ...state,
        id: action.id,
        comments: [],
      }
    case DELETE_POST_RESULT: {
      const {result} = action
      if (result.success && result.post.id === state.id) return {
        ...state,
        id: null,
      }
      else {
        return state
      }
    }
    case GET_COMMENTS_SUCCEEDED:
      return {
        ...state,
        comments: action.comments,
      }
    case DELETE_COMMENT_SUCCEEDED:
      const comments = state.comments.filter(
        comment => comment.id !== action.comment.id,
      )
      return {
        ...state,
        comments,
      }
    case POST_COMMENT_RESULT: {
      const {result} = action
      if (result.success) {
        return {
          ...state,
          comments: [
            ...state.comments,
            result.comment,
          ],
        }
      }
      else {
        return state
      }
    }

    case VOTE_COMMENT_RESULT: {
      const {result} = action
      if (result.success) {
        const rest = state.comments.filter(
          comment => comment.id !== result.comment.id,
        )
        return {
          ...state,
          comments: [
            ...rest,
            result.comment,
          ],
        }
      }
      else {
        return state
      }
    }

    case EDIT_COMMENT_RESULT:{
      const {result} = action
      if (result.success) {
        const rest = state.comments.filter(
          comment => comment.id !== result.comment.id,
        )
        return {
          ...state,
          comments: [
            ...rest,
            result.comment,
          ],
        }
      }
      else {
        return state
      }
    }

    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  options,
  postDetail,
})
