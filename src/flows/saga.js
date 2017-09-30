import {call, put, takeEvery} from 'redux-saga/effects'
import * as api from '../utils/api'
import * as actions from './actions'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchPosts(action) {
  try {
    const posts = yield call(api.allPosts)
    console.log(action, posts)
    yield put(actions.postFetchSuccess(posts))
  } catch (e) {
    yield put(actions.postFetchFail(e.message))
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* saga() {
  yield takeEvery("FETCH_POSTS", fetchPosts)
}


export default saga
