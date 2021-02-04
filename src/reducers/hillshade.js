import {
  SET_SUN_ALTITUDE_ANGLE,
  SET_SUN_AZIMUTH,
  SET_HILLSHADE_LAYER_STYLE,
  INITIALIZE_HILLSHADE
} from '../actions'

const initialState = {
  sunAltitudeAngle: 45,
  sunAzimuth: 180,
  layerStyle: 'greyscale'
}

export default function hillshade(state = initialState, action) {
  const { type, sunAltitudeAngle, sunAzimuth, layerStyle } = action
  switch (type) {
    case INITIALIZE_HILLSHADE:
      return {
        ...initialState
      }
    case SET_SUN_ALTITUDE_ANGLE:
      return {
        ...state,
        sunAltitudeAngle
      }
    case SET_SUN_AZIMUTH:
      return {
        ...state,
        sunAzimuth
      }
    case SET_HILLSHADE_LAYER_STYLE:
      return {
        ...state,
        layerStyle
      }
    default:
      return state
  }
}
