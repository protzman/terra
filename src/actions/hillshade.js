import { makeActionCreator } from '../utils'

export const INITIALIZE_HILLSHADE = 'INITIALIZE_HILLSHADE'
export const initializeHillshade = makeActionCreator(INITIALIZE_HILLSHADE)

export const SET_SUN_ALTITUDE_ANGLE = 'SET_SUN_ALTITUDE_AMGLE'
export const setSunAltitudeAngle = makeActionCreator(SET_SUN_ALTITUDE_ANGLE, 'sunAltitudeAngle')

export const SET_SUN_AZIMUTH = 'SET_SUN_AZIMUTH'
export const setSunAzimuth = makeActionCreator(SET_SUN_AZIMUTH, 'sunAzimuth')

export const SET_HILLSHADE_LAYER_STYLE = 'SET_HILLSHADE_LAYER_STYLE'
export const setHillshadeLayerStyle = makeActionCreator(SET_HILLSHADE_LAYER_STYLE, 'layerStyle')

export const POST_HILLSHADE_TASK_REQUEST = 'POST_HILLSHADE_TASK_REQUEST'
export const POST_HILLSHADE_TASK_SUCCESS = 'POST_HILLSHADE_TASK_SUCCESS'
export const POST_HILLSHADE_TASK_FAILURE = 'POST_HILLSHADE_TASK_FAILURE'
export const postHillshadeTaskRequest = makeActionCreator(POST_HILLSHADE_TASK_REQUEST, 'task')
export const postHillshadeTaskSuccess = makeActionCreator(POST_HILLSHADE_TASK_SUCCESS, 'task')
export const postHillshadeTaskFailure = makeActionCreator(POST_HILLSHADE_TASK_FAILURE, 'task')

export const POLL_HILLSHADE_TASK_INFO_REQUEST = 'POLL_HILLSHADE_TASK_INFO_REQUEST'
export const POLL_HILLSHADE_TASK_INFO_SUCCESS = 'POLL_HILLSHADE_TASK_INFO_SUCCESS'
export const POLL_HILLSHADE_TASK_INFO_FAILURE = 'POLL_HILLSHADE_TASK_INFO_FAILURE'
export const pollHillshadeTaskInfoRequest = makeActionCreator(POLL_HILLSHADE_TASK_INFO_REQUEST, 'jobId')
export const pollHillshadeTaskInfoSuccess = makeActionCreator(POLL_HILLSHADE_TASK_INFO_SUCCESS, 'jobId')
export const pollHillshadeTaskInfoFailure = makeActionCreator(POLL_HILLSHADE_TASK_INFO_FAILURE, 'jobId')
