import {
  SET_VIEWSHED_RADIUS,
  SET_OBSERVER_HEIGHT,
  SET_TARGET_ELEVATION,
  SET_REFRACTION_COEFFICIENT,
  SET_OUTPUT_FORMAT,
  SET_VIEWSHED_LAYER_STYLE,
  INITIALIZE_VIEWSHED
} from '../actions'

const initialState = {
  radius: 2500,
  observerHeight: 50,
  targetElevation: 1250,
  refractionCoefficient: 0.5,
  outputFormat: 'binary',
  layerStyle: 'greenscale'
}

export default function order(state = initialState, action) {
  const {
    type,
    radius,
    observerHeight,
    targetElevation,
    refractionCoefficient,
    outputFormat,
    layerStyle
  } = action
  switch (type) {
    case INITIALIZE_VIEWSHED:
      return {
        ...initialState
      }
    case SET_VIEWSHED_RADIUS:
      return {
        ...state,
        radius
      }
    case SET_OBSERVER_HEIGHT:
      return {
        ...state,
        observerHeight
      }
    case SET_TARGET_ELEVATION:
      return {
        ...state,
        targetElevation
      }
    case SET_REFRACTION_COEFFICIENT:
      return {
        ...state,
        refractionCoefficient
      }
    case SET_OUTPUT_FORMAT:
      return {
        ...state,
        outputFormat
      }
    case SET_VIEWSHED_LAYER_STYLE:
      return {
        ...state,
        layerStyle
      }
    default:
      return state
  }
}
