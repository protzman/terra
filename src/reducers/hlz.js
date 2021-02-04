import {
  INITIALIZE_HLZ,
  SET_AIRFRAME,
  SET_MAX_ALLOWABLE_SLOPE,
  SET_MAX_IDEAL_SLOPE,
  SET_MAX_ALLOWABLE_ELEVATION,
  SET_LANDING_RADIUS,
  SET_HLZ_LAYER_STYLE
} from '../actions'

const initialState = {
  airframe: 'mh6',
  landingRadius: 13,
  maxAllowableSlope: 7,
  maxIdealSlope: 3,
  maxAllowableElevation: 5000,

  layerStyle: 'stoplight'
}
export default function hlz(state = initialState, action) {
  const {
    type,
    airframe,
    maxAllowableSlope,
    maxIdealSlope,
    maxAllowableElevation,
    landingRadius,
    layerStyle
  } = action
  switch (type) {
    case INITIALIZE_HLZ:
      return {
        ...initialState
      }
    case SET_AIRFRAME:
      return {
        ...state,
        airframe
      }
    case SET_MAX_ALLOWABLE_SLOPE:
      return {
        ...state,
        maxAllowableSlope
      }
    case SET_MAX_IDEAL_SLOPE:
      return {
        ...state,
        maxIdealSlope
      }
    case SET_MAX_ALLOWABLE_ELEVATION:
      return {
        ...state,
        maxAllowableElevation
      }
    case SET_LANDING_RADIUS:
      return {
        ...state,
        landingRadius
      }
    case SET_HLZ_LAYER_STYLE:
      return {
        ...state,
        layerStyle
      }
    default:
      return state
  }
}
