import {combineReducers} from 'redux'

import {
  CHANGE_CATEGORY,
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
  SORT_BY,
  SORT_DIRECTION,
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
      console.debug('discarded changes to', deleted)
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

export default combineReducers({
  posts,
  categories,
  options,
})
