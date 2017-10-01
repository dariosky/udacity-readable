import {combineReducers} from 'redux'

import {
  FETCH_POSTS,
} from './actions'

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS :
      return {
        ...state,
        status: 'downloading',
        posts: [],
      }
    case 'POST_FETCH_FAILED':
      return {
        ...state,
        status: 'error',
        message: 'Cannot get posts from API, is it running? ' + action.message,
        posts: [],
      }
    case 'POST_FETCH_SUCCEEDED':
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

export default combineReducers({
  posts,
})
