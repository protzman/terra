import {
  call, put, takeEvery, delay
} from 'redux-saga/effects'
import axios from 'axios'
import { saveAs } from 'file-saver'
import {
  AUTHENTICATE_USER_REQUEST,
  SET_USER_CONSENT,
  authenticateUserSuccess,
  setUser,
  setUserConsent,
  EXPORT_IMAGE_REQUEST,
  FETCH_RASTER_REQUEST,
  fetchRasterRequest,
  fetchPolygonsRequest,
  fetchPolygonsSuccess,
  fetchPolygonsFailure,
  fetchRasterSuccess,
  fetchRasterFailure,
  toggleAppLoading,
  closeExportDialog,
  FETCH_POLYGONS_REQUEST
} from '../actions'

import { apiRoot, redirectUrl } from '../resources/constants'

function downloadPolygonsSaga(polygons, productName) {
  const fileName = productName.replace(/ /g, '_')
  const blob = new Blob([JSON.stringify(polygons)], {
    type: 'application/json'
  })
  saveAs(blob, `${fileName}.json`)
}

function downloadRasterSaga(rasterBlob, productName) {
  const fileName = productName.replace(/ /g, '_')
  saveAs(rasterBlob, fileName)
}

function* setUserConsentCookieSaga() {
  yield document.cookie = 'consent=true'
}

function* authenticateUserRequestSaga() {
  const path = `${apiRoot}/auth/login?origin_url=${redirectUrl}`
  const authuri = `${apiRoot}/auth/me`

  try {
    const response = yield axios.get(authuri, { withCredentials: true })
    yield put(setUser(response.data))
    yield put(authenticateUserSuccess())

    if (document.cookie.split(';').filter(item => item.includes('consent=true')).length) {
      // check for consent cookie, if the cookie exists set state to true to hide dialog
      yield put(setUserConsent(true))
    }
  } catch (error) {
    yield delay(3000)
    yield (window.location = path)
  }
}

function* exportImageRequestSaga(action) {
  const { id, rasterFilename, polygonsFilename } = action
  // fetch the raster from endpoint
  yield put(toggleAppLoading())
  yield delay(1000)
  try {
    if (rasterFilename) yield put(fetchRasterRequest(id, rasterFilename))
    // check for polygons not null
    if (polygonsFilename) yield put(fetchPolygonsRequest(id, polygonsFilename))
    yield put(closeExportDialog())
    yield delay(1000)
    yield put(toggleAppLoading())
  } catch (error) {
    yield put(toggleAppLoading())
    console.log(`error : ${error}`)
  }
  // success/failure
}

function* fetchRasterRequestSaga(action) {
  const { id, fileName } = action
  const extension = fileName.split('.')[1]
  const path = `${apiRoot}/export/raster/${id}.${extension}`
  try {
    const { data } = yield axios.get(path, {
      withCredentials: true,
      responseType: 'blob'
    })
    yield call(downloadRasterSaga(data, fileName))
    yield put(fetchRasterSuccess(id, fileName))
  } catch (error) {
    yield put(fetchRasterFailure(id, fileName))
    console.log(`error : ${error}`)
  }
}

function* fetchPolygonsRequestSaga(action) {
  const { id, fileName } = action
  const path = `${apiRoot}/export/hlz-polygons/${id}`
  try {
    const polygons = yield axios.get(path, { withCredentials: true })
    yield call(downloadPolygonsSaga, polygons, fileName)
    yield put(fetchPolygonsSuccess(id, fileName))
  } catch (error) {
    yield put(fetchPolygonsFailure(id, fileName))
    console.log(`error : ${error}`)
  }
}

// watcher functions

export function* setUserConsentCookieWatcher() {
  yield takeEvery(SET_USER_CONSENT, setUserConsentCookieSaga)
}

export function* authenticateUserRequestWatcher() {
  yield takeEvery(AUTHENTICATE_USER_REQUEST, authenticateUserRequestSaga)
}

export function* exportImageRequestWatcher() {
  yield takeEvery(EXPORT_IMAGE_REQUEST, exportImageRequestSaga)
}

export function* fetchRasterRequestWatcher() {
  yield takeEvery(FETCH_RASTER_REQUEST, fetchRasterRequestSaga)
}

export function* fetchPolygonsRequestWatcher() {
  yield takeEvery(FETCH_POLYGONS_REQUEST, fetchPolygonsRequestSaga)
}
