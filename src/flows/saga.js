import {all, call, put, takeEvery} from 'redux-saga/effects'
import * as api from '../utils/api'
import * as actions from './actions'

// worker Saga: will be fired on actions
function* doFetchPosts(action) {
  try {
    const posts = yield call(api.getPosts, action.category)
    yield put(actions.postFetchSuccess(posts))
  } catch (e) {
    yield put(actions.postFetchFail(e.message))
  }
}

function* doFetchCategories(action) {
  try {
    const categories = yield call(api.allCategories)
    yield put(actions.categoriesFetchSuccess(categories.categories))
  } catch (e) {
    yield put(actions.categoriesFetchFailed(e.message))
  }
}

/*
  Starts fetchPosts on each dispatched `FETCH_POSTS` action.
  Allows concurrent fetches of posts.
*/
function* fetchPostSaga() {
  yield takeEvery(actions.FETCH_POSTS, doFetchPosts)
}

function* fetchCategoriesSaga() {
  yield takeEvery(actions.FETCH_CATEGORIES, doFetchCategories)
}

export default function* rootSaga() {
  yield all([
    fetchPostSaga(),
    fetchCategoriesSaga(),
  ])
}

