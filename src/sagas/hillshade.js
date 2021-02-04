import {
  put, take, takeEvery, delay, race, call
} from 'redux-saga/effects'
import axios from 'axios'

import {
  toggleAppLoading,
  setLeftDrawerOpen,
  setRightDrawerOpen,
  initializeHillshade,
  initializeOrder,
  setJobMetadata,
  addImageToMap,
  setJobStatus,
  POST_HILLSHADE_TASK_REQUEST,
  POLL_HILLSHADE_TASK_INFO_REQUEST,
  POLL_HILLSHADE_TASK_INFO_SUCCESS,
  POLL_HILLSHADE_TASK_INFO_FAILURE,
  pollHillshadeTaskInfoRequest,
  pollHillshadeTaskInfoSuccess,
  pollHillshadeTaskInfoFailure

} from '../actions'

import { apiRoot } from '../resources/constants'

function* postHillshadeTaskRequestSaga(action) {
  const path = `${apiRoot}/tasks/hillshade`
  const { task } = action
  yield put(toggleAppLoading())
  yield delay(1000)
  try {
    const response = yield axios.post(path, task, { withCredentials: true })
    const { jobID } = response.data

    yield put(setJobMetadata(jobID, task))
    yield put(pollHillshadeTaskInfoRequest(jobID))

    // clear left panel to original state
    yield put(initializeHillshade())
    yield put(initializeOrder())

    // close left panel
    yield put(setLeftDrawerOpen(false))
  } catch (error) {
    yield put(toggleAppLoading())
  }
}

function* pollHillshadeTaskInfoRequestSaga(jobId) {
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
        yield put(pollHillshadeTaskInfoSuccess(jobId))
      } else if (status === 'error') {
        yield put(toggleAppLoading())
        yield put(pollHillshadeTaskInfoFailure(jobId))
        throw response.data.error_message
      }
      yield delay(10000)
    } catch (error) {
      console.log(`error : ${error}`)
    }
  }
}


// watcher functions

export function* postHillshadeTaskRequestWatcher() {
  yield takeEvery(POST_HILLSHADE_TASK_REQUEST, postHillshadeTaskRequestSaga)
}

export function* pollHillshadeTaskInfoRequestWatcher() {
  while (true) {
    const { jobId } = yield take(POLL_HILLSHADE_TASK_INFO_REQUEST)
    yield race([
      call(pollHillshadeTaskInfoRequestSaga, jobId),
      take(POLL_HILLSHADE_TASK_INFO_SUCCESS),
      take(POLL_HILLSHADE_TASK_INFO_FAILURE)
    ])
  }
}
