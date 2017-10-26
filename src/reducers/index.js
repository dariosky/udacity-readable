import * as actions from '../flows/actions'
import {comments} from './comments'
import {posts} from './posts'
import {categories} from './categories'

import {combineReducers} from 'redux'

function options(state = {
  sort: 'vote',
  sortDirection: 'desc',
}, action) {
  switch (action.type) {
    case actions.SORT_BY:
      return {
        ...state,
        sort: action.method,
      }
    case actions.SORT_DIRECTION:
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
  comments,
  options,
})
