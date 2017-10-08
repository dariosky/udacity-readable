import {combineReducers} from 'redux'

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILED, FETCH_CATEGORIES_SUCCEEDED, FETCH_POST_SUCCEEDED,
  FETCH_POSTS, FETCH_POSTS_FAILED,
} from './actions'

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS :
      return {
        ...state,
        status: 'downloading',
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
        status: 'Cannot get posts from API, is it running? ' + action.message,
        categories: [],
      }

    case FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        status: 'success',
        categories: action.categories,
      }
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
})
