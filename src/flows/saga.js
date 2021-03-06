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

function* doFetchCategories() {
  try {
    if (delayedRequest) yield delay(300)
    const categories = yield call(api.allCategories)
    yield put(actions.categoriesFetchSuccess(categories.categories))
  } catch (e) {
    yield put(actions.categoriesFetchFailed(e.message))
  }
}

function* doChangeCategory(action) {
  // load the posts when changing category
  if (delayedRequest) yield delay(300)
  yield put(actions.fetchPosts(action.category))
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

/* post Details */

function* doDeleteComment(action) {
  try {
    if (delayedRequest) yield delay(1000)

    const comment = yield call(api.deleteComment, action.id)
    yield put(actions.deleteCommentSucceeded(comment))
  } catch (e) {
    yield put(actions.deleteCommentFailed(e.message))
  }
}

function* doPostComment(action) {
  try {
    if (delayedRequest) yield delay(1000)

    const comment = yield call(api.postComment,
      action.comment)
    yield put(actions.postCommentResult({
      success: true, comment,
    }))
  } catch (e) {
    yield put(actions.postCommentResult({
      success: false,
      error: e.message,
    }))
  }
}

function* doPostDelete(action) {
  try {
    if (delayedRequest) yield delay(1000)

    const post = yield call(api.deletePost, action.postId)
    console.log("deleted", post)
    yield put(actions.deletePostResult({
      success: true,
      post,
    }))
  } catch (e) {
    yield put(actions.deletePostResult({
      success: false,
      error: e.message,
    }))
  }
}

function* doPostVote(action) {
  try {
    if (delayedRequest) yield delay(1000)

    const post = yield call(api.votePost, action.postId, action.vote)
    yield put(actions.votePostResult({
      success: true,
      post,
    }))
  } catch (e) {
    console.error(e)
    yield put(actions.votePostResult({
      success: false,
      error: e.message,
    }))
  }
}

function* doCommentVote(action) {
  try {
    if (delayedRequest) yield delay(1000)

    const comment = yield call(api.voteComment, action.commentId, action.vote)
    yield put(actions.voteCommentResult({
      success: true,
      comment,
    }))
  } catch (e) {
    console.error(e)
    yield put(actions.voteCommentResult({
      success: false,
      error: e.message,
    }))
  }
}

function* doEditComment(action) {
  try {
    if (delayedRequest) yield delay(3000)

    const comment = yield call(
      api.editComment, action.commentId, action.body,
    )
    yield put(actions.editCommentResult({
      success: true,
      comment,
    }))
  } catch (e) {
    console.error(e)
    yield put(actions.editCommentResult({
      success: false,
      error: e.message,
    }))
  }
}

function* doGetPostComments(action) {
  try {
    if (delayedRequest) yield delay(500)

    const comments = yield call(
      api.getComments, action.postId,
    )
    yield put(actions.setPostComments(
      action.postId, comments,
    ))
  } catch (e) {
    console.error(e)
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

function* changeCategorySaga() {
  yield takeEvery(actions.CHANGE_CATEGORY, doChangeCategory)
}

function* deleteCommentSaga() {
  yield takeEvery(actions.DELETE_COMMENT, doDeleteComment)
}

function* postCommentSaga() {
  yield takeEvery(actions.POST_COMMENT, doPostComment)
}

function* postDeleteSaga() {
  yield takeEvery(actions.POST_DELETE, doPostDelete)
}

function* postVoteSaga() {
  yield takeEvery(actions.VOTE_POST, doPostVote)
}

function* commentVoteSaga() {
  yield takeEvery(actions.VOTE_COMMENT, doCommentVote)
}

function* editCommentSaga() {
  yield takeEvery(actions.EDIT_COMMENT, doEditComment)
}

function* getPostCommentsSaga() {
  yield takeEvery(actions.GET_POST_COMMENTS,
    doGetPostComments)
}

export default function* rootSaga() {
  yield all([
    fetchPostSaga(),
    fetchCategoriesSaga(),
    changeCategorySaga(),
    savePostSaga(),
    deleteCommentSaga(),
    postCommentSaga(),
    postDeleteSaga(),

    postVoteSaga(),
    commentVoteSaga(),
    editCommentSaga(),
    getPostCommentsSaga(),
  ])
}

