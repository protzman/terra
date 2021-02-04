import {
  put, takeEvery, delay
} from 'redux-saga/effects'
import axios from 'axios'

import {
  FETCH_SEARCH_RESULTS_REQUEST,
  fetchSearchResultsSuccess,
  fetchSearchResultsFailure,
  toggleAppLoading,
  setResultsDrawerOpen
} from '../actions'

import { searchUrl } from '../resources/constants'

function* fetchSearchResultsRequestSaga(action) {
  const { query } = action
  const path = `${searchUrl}q=${query}&format=jsonv2&addressdetails=1&dedupe=1`
  yield put(toggleAppLoading())
  yield delay(1000)
  try {
    const { data } = yield axios.get(path)
    yield put(fetchSearchResultsSuccess(query, data))
    yield put(setResultsDrawerOpen(true))
    yield put(toggleAppLoading())
  } catch (error) {
    yield put(fetchSearchResultsFailure(query, error))
    yield put(toggleAppLoading())
    console.log(`error: ${error}`)
  }
}

// watcher functions

export function* fetchSearchResultsRequestWatcher() {
  yield takeEvery(FETCH_SEARCH_RESULTS_REQUEST, fetchSearchResultsRequestSaga)
}
