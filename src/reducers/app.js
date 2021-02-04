import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  SET_USER,
  TOGGLE_APP_LOADING,
  SET_THEME,
  SET_BASEMAP,
  SET_UNITS,
  SET_COORDINATE_SYSTEM,
  SET_LEFT_DRAWER_OPEN,
  SET_RIGHT_DRAWER_OPEN,
  SET_RESULTS_DRAWER_OPEN,
  SET_OBSTRUCTION_DRAWER_OPEN,
  SET_USER_CONSENT,
  SET_ACTIVE_JOB,
  SET_ACTIVE_MAP_ITEM,
  OPEN_EXPORT_DIALOG,
  CLOSE_EXPORT_DIALOG,
  SET_ACTIVE_JOB_RASTER_FILENAME,
  SET_ACTIVE_JOB_POLYGONS_FILENAME,
  SET_ACTIVE_DVOF_ITEM,
  CLEAR_ACTIVE_DVOF_ITEM
} from '../actions'
import { basemaps } from '../components/map/config'

export default function app(
  state = {
    loading: false,
    fetching: false,
    error: null,
    authorized: false,
    theme: 'light',
    basemap: basemaps[0],
    units: 'metric',
    system: 'lonLat',
    left: false,
    right: false,
    results: false,
    obstruction: false,
    productName: '',
    user: null,
    consent: false,
    activeJob: null,
    activeMapItem: null,
    exportDialog: false,
    deleteDialog: false,
    activeDvofItem: null
  },
  action
) {
  const {
    error,
    type,
    theme,
    basemap,
    units,
    system,
    user,
    left,
    right,
    results,
    obstruction,
    consent,
    id,
    job,
    mapItem,
    rasterFilename,
    polygonsFilename,
    dvofItem,
    dvofFeatureId,
    dvofFeatureParentLayerId
  } = action
  switch (type) {
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        authorized: true,
        fetching: false,
        error: null
      }
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        fetching: false,
        error
      }
    case SET_USER:
      return {
        ...state,
        user
      }
    case TOGGLE_APP_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case SET_THEME:
      return {
        ...state,
        theme
      }
    case SET_BASEMAP:
      return {
        ...state,
        basemap
      }
    case SET_COORDINATE_SYSTEM:
      return {
        ...state,
        system
      }
    case SET_UNITS:
      return {
        ...state,
        units
      }
    case SET_LEFT_DRAWER_OPEN:
      return {
        ...state,
        left
      }
    case SET_RIGHT_DRAWER_OPEN:
      return {
        ...state,
        right,
        results: right === false && false
      }
    case SET_RESULTS_DRAWER_OPEN:
      return {
        ...state,
        right: results === false && false,
        results
      }
    case SET_OBSTRUCTION_DRAWER_OPEN:
      return {
        ...state,
        obstruction
      }
    case SET_USER_CONSENT:
      return {
        ...state,
        consent
      }
    case SET_ACTIVE_JOB:
      return {
        ...state,
        activeJob: {
          id,
          job
        }
      }
    case SET_ACTIVE_MAP_ITEM:
      return {
        ...state,
        activeMapItem: mapItem
      }
    case OPEN_EXPORT_DIALOG:
      return {
        ...state,
        exportDialog: true,
        activeJob: {
          id,
          job
        }
      }
    case CLOSE_EXPORT_DIALOG:
      return {
        ...state,
        exportDialog: false,
        activeJob: {}
      }
    case SET_ACTIVE_JOB_RASTER_FILENAME:
      return {
        ...state,
        activeJob: {
          ...state.activeJob,
          rasterFilename
        }
      }
    case SET_ACTIVE_JOB_POLYGONS_FILENAME:
      return {
        ...state,
        activeJob: {
          ...state.activeJob,
          polygonsFilename
        }
      }
    case SET_ACTIVE_DVOF_ITEM:
      return {
        ...state,
        obstruction: true,
        activeDvofItem: {
          id,
          dvofFeatureId,
          dvofFeatureParentLayerId,
          dvofItem
        }
      }
    case CLEAR_ACTIVE_DVOF_ITEM:
      return {
        ...state,
        activeDvofItem: null,
        obstruction: false
      }
    default:
      return state
  }
}
