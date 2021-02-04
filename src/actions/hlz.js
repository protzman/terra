import { makeActionCreator } from '../utils'

export const INITIALIZE_HLZ = 'INITIALIZE_HLZ'
export const initializeHlz = makeActionCreator(INITIALIZE_HLZ)

export const SET_AIRFRAME = 'SET_AIRFRAME'
export const setAirframe = makeActionCreator(SET_AIRFRAME, 'airframe')

export const SET_MAX_ALLOWABLE_SLOPE = 'SET_MAX_ALLOWABLE_SLOPE'
export const setMaxAllowableSlope = makeActionCreator(SET_MAX_ALLOWABLE_SLOPE, 'maxAllowableSlope')

export const SET_MAX_IDEAL_SLOPE = 'SET_MAX_IDEAL_SLOPE'
export const setMaxIdealSlope = makeActionCreator(SET_MAX_IDEAL_SLOPE, 'maxIdealSlope')

export const SET_MAX_ALLOWABLE_ELEVATION = 'SET_MAX_ALLOWABLE_ELEVATION'
export const setMaxAllowableElevation = makeActionCreator(SET_MAX_ALLOWABLE_ELEVATION, 'maxAllowableElevation')

export const SET_LANDING_RADIUS = 'SET_LANDING_RADIUS'
export const setLandingRadius = makeActionCreator(SET_LANDING_RADIUS, 'landingRadius')

export const SET_HLZ_LAYER_STYLE = 'SET_HLZ_LAYER_STYLE'
export const setHlzLayerStyle = makeActionCreator(SET_HLZ_LAYER_STYLE, 'layerStyle')

export const POST_HLZ_TASK_REQUEST = 'POST_HLZ_TASK_REQUEST'
export const POST_HLZ_TASK_SUCCESS = 'POST_HLZ_TASK_SUCCESS'
export const POST_HLZ_TASK_FAILURE = 'POST_HLZ_TASK_FAILURE'
export const postHlzTaskRequest = makeActionCreator(POST_HLZ_TASK_REQUEST, 'task')
export const postHlzTaskSuccess = makeActionCreator(POST_HLZ_TASK_SUCCESS, 'task')
export const postHlzTaskFailure = makeActionCreator(POST_HLZ_TASK_FAILURE, 'task')

export const POLL_HLZ_TASK_INFO_REQUEST = 'POLL_HLZ_TASK_INFO_REQUEST'
export const POLL_HLZ_TASK_INFO_SUCCESS = 'POLL_HLZ_TASK_INFO_SUCCESS'
export const POLL_HLZ_TASK_INFO_FAILURE = 'POLL_HLZ_TASK_INFO_FAILURE'
export const pollHlzTaskInfoRequest = makeActionCreator(POLL_HLZ_TASK_INFO_REQUEST, 'jobId')
export const pollHlzTaskInfoSuccess = makeActionCreator(POLL_HLZ_TASK_INFO_SUCCESS, 'jobId')
export const pollHlzTaskInfoFailure = makeActionCreator(POLL_HLZ_TASK_INFO_FAILURE, 'jobId')

export const FETCH_HLZ_DVOF_FEATURES_REQUEST = 'FETCH_HLZ_DVOF_FEATURES_REQUEST'
export const FETCH_HLZ_DVOF_FEATURES_SUCCESS = 'FETCH_HLZ_DVOF_FEATURES_SUCCESS'
export const FETCH_HLZ_DVOF_FEATURES_FAILURE = 'FETCH_HLZ_DVOF_FEATURES_FAILURE'
export const fetchHlzDvofFeaturesRequest = makeActionCreator(FETCH_HLZ_DVOF_FEATURES_REQUEST, 'jobId')
export const fetchHlzDvofFeaturesSuccess = makeActionCreator(FETCH_HLZ_DVOF_FEATURES_SUCCESS, 'jobId')
export const fetchHlzDvofFeaturesFailure = makeActionCreator(FETCH_HLZ_DVOF_FEATURES_FAILURE, 'jobId')