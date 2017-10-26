import * as actions from '../flows/actions'

export function categories(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_CATEGORIES:
      return {
        ...state,
        status: 'downloading',
        categories: [],
      }
    case actions.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        status: 'error',
        message: 'Cannot talk with API, is it running? ' + action.message,
        categories: [],
      }

    case actions.FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        status: 'success',
        categories: action.categories,
      }
    case actions.CHANGE_CATEGORY:
      return {
        ...state,
        current: action.category,
      }
    default:
      return state
  }
}
