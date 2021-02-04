import { makeActionCreator } from '../utils/makeActionCreator'

export const INITIALIZE_VIEWSHED = 'INITIALIZE_VIEWSHED'
export const initializeViewshed = makeActionCreator(INITIALIZE_VIEWSHED)

export const SET_VIEWSHED_RADIUS = 'SET_VIEWSHED_RADIUS'
export const setViewshedRadius = makeActionCreator(SET_VIEWSHED_RADIUS, 'radius')

export const SET_OBSERVER_HEIGHT = 'SET_OBSERVER_HEIGHT'
export const setObserverHeight = makeActionCreator(SET_OBSERVER_HEIGHT, 'observerHeight')

export const SET_TARGET_ELEVATION = 'SET_TARGET_ELEVATION'
export const setTargetElevation = makeActionCreator(SET_TARGET_ELEVATION, 'targetElevation')

export const SET_REFRACTION_COEFFICIENT = 'SET_REFRACTION_COEFFICIENT'
export const setRefractionCoefficient = makeActionCreator(SET_REFRACTION_COEFFICIENT, 'refractionCoefficient')

export const SET_OUTPUT_FORMAT = 'SET_OUTPUT_FORMAT'
export const setOutputFormat = makeActionCreator(SET_OUTPUT_FORMAT, 'outputFormat')

export const SET_VIEWSHED_LAYER_STYLE = 'SET_VIEWSHED_LAYER_STYLE'
export const setViewshedLayerStyle = makeActionCreator(SET_VIEWSHED_LAYER_STYLE, 'layerStyle')

export const POST_VIEWSHED_TASK_REQUEST = 'POST_VIEWSHED_TASK_REQUEST'
export const POST_VIEWSHED_TASK_SUCCESS = 'POST_VIEWSHED_TASK_SUCCESS'
export const POST_VIEWSHED_TASK_FAILURE = 'POST_VIEWSHED_TASK_FAILURE'
export const postViewshedTaskRequest = makeActionCreator(POST_VIEWSHED_TASK_REQUEST, 'task')
export const postViewshedTaskSuccess = makeActionCreator(POST_VIEWSHED_TASK_SUCCESS, 'task')
export const postViewshedTaskFailure = makeActionCreator(POST_VIEWSHED_TASK_FAILURE, 'task')

export const POLL_VIEWSHED_TASK_INFO_REQUEST = 'POLL_VIEWSHED_TASK_INFO_REQUEST'
export const POLL_VIEWSHED_TASK_INFO_SUCCESS = 'POLL_VIEWSHED_TASK_INFO_SUCCESS'
export const POLL_VIEWSHED_TASK_INFO_FAILURE = 'POLL_VIEWSHED_TASK_INFO_FAILURE'
export const pollViewshedTaskInfoRequest = makeActionCreator(POLL_VIEWSHED_TASK_INFO_REQUEST, 'jobId')
export const pollViewshedTaskInfoSuccess = makeActionCreator(POLL_VIEWSHED_TASK_INFO_SUCCESS, 'jobId')
export const pollViewshedTaskInfoFailure = makeActionCreator(POLL_VIEWSHED_TASK_INFO_FAILURE, 'jobId')
