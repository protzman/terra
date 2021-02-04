import { all, fork } from 'redux-saga/effects'

import {
  setUserConsentCookieWatcher,
  authenticateUserRequestWatcher,
  exportImageRequestWatcher,
  fetchRasterRequestWatcher,
  fetchPolygonsRequestWatcher
} from './app'
import {
  setAirframeParametersWatcher,
  postHlzTaskRequestWatcher,
  pollHlzTaskInfoRequestWatcher,
  fetchHlzDvofFeaturesRequestWatcher
} from './hlz'
import {
  postHillshadeTaskRequestWatcher,
  pollHillshadeTaskInfoRequestWatcher
} from './hillshade'
import {
  postViewshedTaskRequestWatcher,
  pollViewshedTaskInfoRequestWatcher
} from './viewshed'
import {
  fetchSearchResultsRequestWatcher
} from './search'

function* clientSagas() {
  yield all([
    fork(setUserConsentCookieWatcher),
    fork(authenticateUserRequestWatcher),
    fork(setAirframeParametersWatcher),
    fork(postHlzTaskRequestWatcher),
    fork(pollHlzTaskInfoRequestWatcher),
    fork(postHillshadeTaskRequestWatcher),
    fork(pollHillshadeTaskInfoRequestWatcher),
    fork(postViewshedTaskRequestWatcher),
    fork(pollViewshedTaskInfoRequestWatcher),
    fork(exportImageRequestWatcher),
    fork(fetchRasterRequestWatcher),
    fork(fetchPolygonsRequestWatcher),
    fork(fetchSearchResultsRequestWatcher),
    fork(fetchHlzDvofFeaturesRequestWatcher)
  ])
}

export default function* mainSaga() {
  yield all([fork(clientSagas)])
}
