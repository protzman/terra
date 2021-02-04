import {
  SET_JOB_METADATA,
  SET_JOB_STATUS,
  SET_JOB_OPACITY,
  SET_JOB_VISIBILITY,
  SET_JOB_LAYER_ID,
  SET_JOB_FEATURES,
  SET_JOB_DVOF_LAYER_ID,
  DELETE_JOB
} from '../actions'

export default function job(state = {
  jobs: []
}, action) {
  const {
    type,
    id,
    metadata,
    status,
    opacity,
    visibility,
    layerId,
    features,
    dvofLayerId
  } = action
  switch (type) {
    case SET_JOB_METADATA:
      return {
        ...state,
        jobs: [
          ...state.jobs,
          {
            id,
            metadata,
            status: 'submitted',
            opacity: 0.5,
            visibility: true,
            layerId: null,
            features: {},
            dvofLayerId: null
          }
        ]
      }
    case SET_JOB_STATUS:
      return {
        ...state,
        jobs: [
          ...state.jobs.map(item => (item.id === id
            ? {
              ...item,
              status
            }
            : item))
        ]
      }
    case SET_JOB_OPACITY:
      return {
        ...state,
        jobs: [
          ...state.jobs.map(item => (item.id === id
            ? {
              ...item,
              opacity
            }
            : item))
        ]
      }
    case SET_JOB_VISIBILITY:
      return {
        ...state,
        jobs: [
          ...state.jobs.map(item => (item.id === id
            ? {
              ...item,
              visibility
            } : item))
        ]
      }
    case SET_JOB_LAYER_ID:
      return {
        ...state,
        jobs: [
          ...state.jobs.map(item => (item.id === id
            ? {
              ...item,
              layerId
            }
            : item))
        ]
      }
    case SET_JOB_FEATURES:
      return {
        ...state,
        jobs: [
          ...state.jobs.map(item => (item.id === id
            ? {
              ...item,
              features
            }
            : item))
        ]
      }
    case SET_JOB_DVOF_LAYER_ID:
      return {
        ...state,
        jobs: [
          ...state.jobs.map(item => (item.id === id
            ? {
              ...item,
              dvofLayerId
            }
            : item))
        ]
      }
    case DELETE_JOB:
      return {
        ...state,
        jobs: [
          ...state.jobs.filter(item => item.id !== id)
        ]
      }
    default:
      return state
  }
}
