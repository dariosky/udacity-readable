import * as actions from '../flows/actions'

export function posts(state = {}, action) {
  switch (action.type) {

    case actions.FETCH_POSTS :
      return {
        ...state,
        status: 'downloading',
        category: action.category,
        posts: [],
      }

    case actions.FETCH_POSTS_FAILED:
      return {
        ...state,
        status: 'error',
        message: 'Cannot get posts from API, is it running? ' + action.message,
        posts: [],
      }

    case actions.FETCH_POST_SUCCEEDED:
      return {
        ...state,
        message: '',
        status: 'success',
        posts: action.posts,
      }

    case actions.EDIT_POST:
      const {post} = action
      return {
        ...state,
        edit: post, // edit a post
      }

    case actions.EDIT_POST_CANCEL: {
      const {edit: deleted, ...rest} = state
      console.debug('deleted', deleted)
      return rest
    }

    case actions.EDIT_POST_SUCCESS: {// add the post and close the edit modal
      const {edit: deleted, ...rest} = state
      console.debug('deleted', deleted)
      return {
        ...rest,
        posts: [...state.posts, action.post],
      }
    }

    case actions.EDIT_POST_FAIL:
      return {
        ...state,
        status: 'error',
        message: 'Something went wrong saving the POST' + action.message,
      }

    case actions.DELETE_POST_RESULT: {
      const {result} = action
      if (result.success) return {
        ...state,
        posts: state.posts.filter(
          post => post.id !== result.post.id,
        ),
      }
      else {
        return state
      }
    }

    case actions.VOTE_POST_RESULT: {
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
