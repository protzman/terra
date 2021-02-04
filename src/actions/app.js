import { makeActionCreator } from '../utils'

export const TOGGLE_APP_LOADING = 'TOGGLE_APP_LOADING'
export const toggleAppLoading = makeActionCreator(TOGGLE_APP_LOADING)

export const OPEN_EXPORT_DIALOG = 'OPEN_EXPORT_DIALOG'
export const openExportDialog = makeActionCreator(OPEN_EXPORT_DIALOG, 'id', 'job')

export const CLOSE_EXPORT_DIALOG = 'CLOSE_EXPORT_DIALOG'
export const closeExportDialog = makeActionCreator(CLOSE_EXPORT_DIALOG)

export const OPEN_DELETE_DIALOG = 'OPEN_DELETE_DIALOG'
export const openDeleteDialog = makeActionCreator(OPEN_DELETE_DIALOG, 'id', 'job')

export const CLOSE_DELETE_DIALOG = 'CLOSE_DELETE_DIALOG'
export const closeDeleteDialog = makeActionCreator(CLOSE_DELETE_DIALOG)

export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE'
export const authenticateUserRequest = makeActionCreator(AUTHENTICATE_USER_REQUEST)
export const authenticateUserSuccess = makeActionCreator(AUTHENTICATE_USER_SUCCESS)
export const authenticateUserFailure = makeActionCreator(AUTHENTICATE_USER_FAILURE)

export const SET_USER = 'SET_USER'
export const setUser = makeActionCreator(SET_USER, 'user')

export const SET_USER_TOKEN = 'SET_USER_TOKEN'
export const setUserToken = makeActionCreator(SET_USER_TOKEN, 'token')

export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = makeActionCreator(LOGOUT_USER)

export const SET_THEME = 'SET_THEME'
export const setTheme = makeActionCreator(SET_THEME, 'theme')

export const SET_BASEMAP = 'SET_BASEMAP'
export const setBasemap = makeActionCreator(SET_BASEMAP, 'basemap')

export const SET_UNITS = 'SET_UNITS'
export const setUnits = makeActionCreator(SET_UNITS, 'units')

export const SET_DATA_FORMAT = 'SET_DATA_FORMAT'
export const setDataFormat = makeActionCreator(SET_DATA_FORMAT, 'format')

export const SET_COORDINATE_SYSTEM = 'SET_COORDINATE_SYSTEM'
export const setCoordinateSystem = makeActionCreator(SET_COORDINATE_SYSTEM, 'system')

export const SET_LEFT_DRAWER_OPEN = 'SET_LEFT_DRAWER_OPEN'
export const setLeftDrawerOpen = makeActionCreator(SET_LEFT_DRAWER_OPEN, 'left')

export const SET_RIGHT_DRAWER_OPEN = 'SET_RIGHT_DRAWER_OPEN'
export const setRightDrawerOpen = makeActionCreator(SET_RIGHT_DRAWER_OPEN, 'right')

export const SET_RESULTS_DRAWER_OPEN = 'SET_RESULTS_DRAWER_OPEN'
export const setResultsDrawerOpen = makeActionCreator(SET_RESULTS_DRAWER_OPEN, 'results')

export const SET_OBSTRUCTION_DRAWER_OPEN = 'SET_OBSTRUCTION_DRAWER_OPEN'
export const setObstructionDrawerOpen = makeActionCreator(SET_OBSTRUCTION_DRAWER_OPEN, 'obstruction', 'retainDvof')

export const SET_USER_CONSENT = 'SET_USER_CONSENT'
export const setUserConsent = makeActionCreator(SET_USER_CONSENT, 'consent')

export const SET_ACTIVE_JOB = 'SET_ACTIVE_JOB'
export const setActiveJob = makeActionCreator(SET_ACTIVE_JOB, 'id', 'job')

export const SET_ACTIVE_MAP_ITEM = 'SET_ACTIVE_MAP_ITEM'
export const setActiveMapItem = makeActionCreator(SET_ACTIVE_MAP_ITEM, 'mapItem')

export const SET_ACTIVE_JOB_RASTER_FILENAME = 'SET_ACTIVE_JOB_RASTER_FILENAME'
export const setActiveJobRasterFilename = makeActionCreator(SET_ACTIVE_JOB_RASTER_FILENAME, 'rasterFilename')

export const SET_ACTIVE_JOB_POLYGONS_FILENAME = 'SET_ACTIVE_JOB_POLYGONS_FILENAME'
export const setActiveJobPolygonsFilename = makeActionCreator(SET_ACTIVE_JOB_POLYGONS_FILENAME, 'polygonsFilename')

export const EXPORT_IMAGE_REQUEST = 'EXPORT_IMAGE_REQUEST'
export const exportImageRequest = makeActionCreator(EXPORT_IMAGE_REQUEST, 'id', 'rasterFilename', 'polygonsFilename')

export const FETCH_POLYGONS_REQUEST = 'FETCH_POLYGONS_REQUEST'
export const FETCH_POLYGONS_SUCCESS = 'FETCH_POLYGONS_SUCCESS'
export const FETCH_POLYGONS_FAILURE = 'FETCH_POLYGONS_FAILURE'
export const fetchPolygonsRequest = makeActionCreator(FETCH_POLYGONS_REQUEST, 'id', 'fileName')
export const fetchPolygonsSuccess = makeActionCreator(FETCH_POLYGONS_SUCCESS, 'id', 'fileName')
export const fetchPolygonsFailure = makeActionCreator(FETCH_POLYGONS_FAILURE, 'id', 'fileName')

export const FETCH_RASTER_REQUEST = 'FETCH_RASTER_REQUEST'
export const FETCH_RASTER_SUCCESS = 'FETCH_RASTER_SUCCESS'
export const FETCH_RASTER_FAILURE = 'FETCH_RASTER_FAILURE'
export const fetchRasterRequest = makeActionCreator(FETCH_RASTER_REQUEST, 'id', 'fileName')
export const fetchRasterSuccess = makeActionCreator(FETCH_RASTER_SUCCESS, 'id', 'fileName')
export const fetchRasterFailure = makeActionCreator(FETCH_RASTER_FAILURE, 'id', 'fileName')

export const SET_ACTIVE_DVOF_ITEM = 'SET_ACTIVE_DVOF_ITEM'
export const setActiveDvofItem = makeActionCreator(SET_ACTIVE_DVOF_ITEM, 'id', 'dvofFeatureId', 'dvofFeatureParentLayerId', 'dvofItem')

export const CLEAR_ACTIVE_DVOF_ITEM = 'CLEAR_ACTIVE_DVOF_ITEM'
export const clearActiveDvofItem = makeActionCreator(CLEAR_ACTIVE_DVOF_ITEM)
