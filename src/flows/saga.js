import {all, call, put, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import * as api from '../utils/api'
import * as actions from './actions'

const delayedRequest = false

// worker Saga: will be fired on actions
function* doFetchPosts(action) {
  try {
    if (delayedRequest) yield delay(5000)
    const posts = yield call(api.getPosts, action.category)
    yield put(actions.postFetchSuccess(posts))
  } catch (e) {
    yield put(actions.postFetchFail(e.message))
  }
}

function* doFetchCategories(action) {
  try {
    if (delayedRequest) yield delay(300)
    const categories = yield call(api.allCategories)
    yield put(actions.categoriesFetchSuccess(categories.categories))
  } catch (e) {
    yield put(actions.categoriesFetchFailed(e.message))
  }
}

/* Save Posts */
function* doSavePost(action) {
  try {
    if (delayedRequest) yield delay(900)

    const post = yield call(api.savePost, action.post)
    yield put(actions.savePostSuccess(post))
  } catch (e) {
    yield put(actions.savePostFailed(e.message))
  }

}

/*
  The sagas for the async calls
*/
function* fetchPostSaga() {
  yield takeEvery(actions.FETCH_POSTS, doFetchPosts)
}

function* fetchCategoriesSaga() {
  yield takeEvery(actions.FETCH_CATEGORIES, doFetchCategories)
}

function* savePostSaga() {
  yield takeEvery(actions.EDIT_POST_SAVE, doSavePost)
}

export default function* rootSaga() {
  yield all([
    fetchPostSaga(),
    fetchCategoriesSaga(),
    savePostSaga(),
  ])
}

