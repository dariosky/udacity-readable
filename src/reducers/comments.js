import * as actions from '../flows/actions'

export function comments(state = {id: null}, action) {
  switch (action.type) {

    case actions.CHANGE_POST:
      return {
        ...state,
        id: action.id,
      }

    case actions.DELETE_POST_RESULT: {
      const {result} = action
      if (result.success && result.post.id === state.id) {
        // delete the comments of the deleted post
        // change the current post.id if we deleted the current
        const {[result.post.id]: deleted, ...rest} = state.comments
        console.log('deleted post', result.post.id, deleted)
        return {
          ...rest,
          id: state.id === result.post.id ? null : state.id,
        }
      }
      else {
        return state
      }
    }

    case actions.DELETE_COMMENT_SUCCEEDED: {
      const postId = action.comment.parentId
      const comments = state[postId].filter(
        comment => comment.id !== action.comment.id,
      )
      return {
        ...state,
        [postId]: comments,
      }
    }

    case actions.SET_POST_COMMENTS: {
      return {
        ...state,
        [action.postId]: action.comments,
      }
    }

    case actions.POST_COMMENT_RESULT: {
      const {result} = action
      if (result.success) {
        const postId = result.comment.parentId
        return {
          ...state,
          [postId]: [
            ...state[postId],
            result.comment,
          ],
        }
      }
      else {
        return state
      }
    }

    case actions.VOTE_COMMENT_RESULT: {
      const {result} = action
      if (result.success) {
        const postId = result.comment.parentId
        return {
          ...state,
          [postId]: state[postId].map(
            comment => comment.id !== result.comment.id ? comment : result.comment,
          ),
        }
      }
      else {
        return state
      }
    }

    case actions.EDIT_COMMENT_RESULT: {
      const {result} = action
      if (result.success) {
        const postId = result.comment.parentId
        return {
          ...state,
          [postId]: state[postId].map(
            comment => comment.id !== result.comment.id ? comment : result.comment,
          ),
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
