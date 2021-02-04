import {
  put, take, takeEvery, delay, race, call
} from 'redux-saga/effects'
import axios from 'axios'

import {
  toggleAppLoading,
  setLeftDrawerOpen,
  setRightDrawerOpen,
  initializeViewshed,
  initializeOrder,
  setJobMetadata,
  addImageToMap,
  setJobStatus,
  POST_VIEWSHED_TASK_REQUEST,
  POLL_VIEWSHED_TASK_INFO_REQUEST,
  POLL_VIEWSHED_TASK_INFO_SUCCESS,
  POLL_VIEWSHED_TASK_INFO_FAILURE,
  pollViewshedTaskInfoRequest,
  pollViewshedTaskInfoSuccess,
  pollViewshedTaskInfoFailure
} from '../actions'

import { apiRoot } from '../resources/constants'

function* postViewshedTaskRequestSaga(action) {
  const path = `${apiRoot}/tasks/viewshed`
  const { task } = action
  yield put(toggleAppLoading())
  yield delay(1000)
  try {
    const response = yield axios.post(path, task, { withCredentials: true })
    const { jobID } = response.data

    yield put(setJobMetadata(jobID, task))
    yield put(pollViewshedTaskInfoRequest(jobID))

    // clear left panel to original state
    yield put(initializeViewshed())
    yield put(initializeOrder())

    // close left panel
    yield put(setLeftDrawerOpen(false))
  } catch (error) {
    yield put(toggleAppLoading())
  }
}

function* pollViewshedTaskInfoRequestSaga(jobId) {
  const path = `${apiRoot}/tasks/info/${jobId}`
  yield put(setRightDrawerOpen(true))
  // set id of a new entry / image and update the status below

  while (true) {
    try {
      const response = yield axios.get(path, { withCredentials: true })
      const { status } = response.data

      // set status of specific job in right hand panel
      yield put(setJobStatus(jobId, status))

      if (status === 'finished') {
        yield put(toggleAppLoading())
        yield put(addImageToMap(jobId))
        yield put(pollViewshedTaskInfoSuccess(jobId))
      } else if (status === 'error') {
        yield put(toggleAppLoading())
        yield put(pollViewshedTaskInfoFailure(jobId))
        throw response.data.error_message
      }
      yield delay(10000)
    } catch (error) {
      console.log(`error : ${error}`)
    }
  }
}

// watcher functions

export function* postViewshedTaskRequestWatcher() {
  yield takeEvery(POST_VIEWSHED_TASK_REQUEST, postViewshedTaskRequestSaga)
}
export function* pollViewshedTaskInfoRequestWatcher() {
  while (true) {
    const { jobId } = yield take(POLL_VIEWSHED_TASK_INFO_REQUEST)
    yield race([
      call(pollViewshedTaskInfoRequestSaga, jobId),
      take(POLL_VIEWSHED_TASK_INFO_SUCCESS),
      take(POLL_VIEWSHED_TASK_INFO_FAILURE)
    ])
  }
}
