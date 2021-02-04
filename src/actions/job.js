import { makeActionCreator } from '../utils'

export const SET_JOB_METADATA = 'SET_JOB_METADATA'
export const setJobMetadata = makeActionCreator(SET_JOB_METADATA, 'id', 'metadata')

export const SET_JOB_STATUS = 'SET_JOB_STATUS'
export const setJobStatus = makeActionCreator(SET_JOB_STATUS, 'id', 'status')

export const SET_JOB_OPACITY = 'SET_JOB_OPACITY'
export const setJobOpacity = makeActionCreator(SET_JOB_OPACITY, 'id', 'opacity')

export const SET_JOB_VISIBILITY = 'SET_JOB_VISIBILITY'
export const setJobVisibility = makeActionCreator(SET_JOB_VISIBILITY, 'id', 'visibility')

export const SET_JOB_LAYER_ID = 'SET_JOB_LAYER_ID'
export const setJobLayerId = makeActionCreator(SET_JOB_LAYER_ID, 'id', 'layerId')

export const SET_JOB_FEATURES = 'SET_JOB_FEATURES'
export const setJobFeatures = makeActionCreator(SET_JOB_FEATURES, 'id', 'features')

export const SET_JOB_DVOF_LAYER_ID = 'SET_JOB_DVOF_LAYER_ID'
export const setJobDvofLayerId = makeActionCreator(SET_JOB_DVOF_LAYER_ID, 'id', 'dvofLayerId')

export const DELETE_JOB = 'DELETE_JOB'
export const deleteJob = makeActionCreator(DELETE_JOB, 'id')
