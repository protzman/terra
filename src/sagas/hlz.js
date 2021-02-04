import {
  put, take, takeEvery, delay, race, call
} from 'redux-saga/effects'
import axios from 'axios'

import {
  SET_AIRFRAME,
  setLandingRadius,
  setMaxAllowableSlope,
  setMaxIdealSlope,
  POST_HLZ_TASK_REQUEST,
  toggleAppLoading,
  POLL_HLZ_TASK_INFO_REQUEST,
  POLL_HLZ_TASK_INFO_SUCCESS,
  POLL_HLZ_TASK_INFO_FAILURE,
  pollHlzTaskInfoRequest,
  pollHlzTaskInfoFailure,
  pollHlzTaskInfoSuccess,
  addImageToMap,
  setRightDrawerOpen,
  setLeftDrawerOpen,
  setJobMetadata,
  setJobStatus,
  setJobOpacity,
  initializeHlz,
  initializeOrder,
  fetchHlzDvofFeaturesRequest,
  FETCH_HLZ_DVOF_FEATURES_REQUEST,
  fetchHlzDvofFeaturesFailure,
  setJobFeatures
} from '../actions'

import { apiRoot } from '../resources/constants'

const airframeParameters = {
  mh6: {
    landingRadius: 13,
    maxAllowableSlope: 7,
    maxIdealSlope: 3
  },
  uh60mh60: {
    landingRadius: 25,
    maxAllowableSlope: 7,
    maxIdealSlope: 3
  },
  ch47mh47: {
    landingRadius: 40,
    maxAllowableSlope: 7,
    maxIdealSlope: 3
  }
}

function* setAirframeParametersSaga(action) {
  const { airframe } = action
  const {
    landingRadius,
    maxAllowableSlope,
    maxIdealSlope
  } = airframeParameters[airframe]
  yield put(setLandingRadius(landingRadius))
  yield put(setMaxAllowableSlope(maxAllowableSlope))
  yield put(setMaxIdealSlope(maxIdealSlope))
}


function* postHlzTaskRequestSaga(action) {
  const path = `${apiRoot}/tasks/hlz`
  const { task } = action
  yield put(toggleAppLoading())
  yield delay(1000)
  try {
    const response = yield axios.post(path, task, { withCredentials: true })
    const { jobID } = response.data
    yield put(setJobMetadata(jobID, task))
    yield put(pollHlzTaskInfoRequest(jobID))

    // clear left panel to original state
    yield put(initializeHlz())
    yield put(initializeOrder())

    // close left panel
    yield put(setLeftDrawerOpen(false))
  } catch (error) {
    yield put(toggleAppLoading())
  }
}

function* pollHlzTaskInfoRequestSaga(jobId) {
  const path = `${apiRoot}/tasks/info/${jobId}`

  // open right panel
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
        yield put(setJobOpacity(jobId, 0.5))
        yield put(fetchHlzDvofFeaturesRequest(jobId))
        yield put(pollHlzTaskInfoSuccess(jobId))
      } else if (status === 'error') {
        yield put(toggleAppLoading())
        yield put(pollHlzTaskInfoFailure(jobId))
        throw response.data.error_message
      }
      yield delay(10000)
    } catch (error) {
      console.log(`error : ${error}`)
    }
  }
}
function* fetchHlzDvofFeaturesRequestSaga(action) {
  const { jobId } = action
  const path = `${apiRoot}/features/dvof/${jobId}`
  try {
    const { data } = yield axios.get(path, { withCredentials: true })
    yield put(setJobFeatures(jobId, data))
  } catch (error) {
    console.log(`error: ${error}`)
    yield put(fetchHlzDvofFeaturesFailure(jobId))
  }
}

// watcher functions
export function* setAirframeParametersWatcher() {
  yield takeEvery(SET_AIRFRAME, setAirframeParametersSaga)
}

export function* postHlzTaskRequestWatcher() {
  yield takeEvery(POST_HLZ_TASK_REQUEST, postHlzTaskRequestSaga)
}

export function* pollHlzTaskInfoRequestWatcher() {
  while (true) {
    const { jobId } = yield take(POLL_HLZ_TASK_INFO_REQUEST)
    yield race([
      call(pollHlzTaskInfoRequestSaga, jobId),
      take(POLL_HLZ_TASK_INFO_SUCCESS),
      take(POLL_HLZ_TASK_INFO_FAILURE)])
  }
}

export function* fetchHlzDvofFeaturesRequestWatcher() {
  yield takeEvery(FETCH_HLZ_DVOF_FEATURES_REQUEST, fetchHlzDvofFeaturesRequestSaga)
}
