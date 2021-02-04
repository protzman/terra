import {
  INITIALIZE_ORDER,
  SET_ORDER_OPERATION,
  SET_ORDER_DATASOURCE,
  SET_PRODUCT_NAME,
  SET_ACTIVE_DRAW_FEATURE,
  SET_ACTIVE_DRAW_FEATURE_ID,
  SET_BOUNDING_BOX_METADATA,
  CLEAR_BOUNDING_BOX_METADATA,
  SET_CIRCLE_METADATA,
  CLEAR_CIRCLE_METADATA
} from '../actions'

const initialState = {
  operation: '',
  datasource: '',
  productName: '',
  format: 'latlon',
  feature: '',
  featureId: '',
  bottomLeftCoordinate: '',
  topRightCoordinate: '',
  boundingBoxArea: '',
  circleCoordinate: '',
  circleRadius: '',
  circleArea: ''
}

export default function order(state = initialState, action) {
  const {
    type,
    operation,
    datasource,
    productName,
    feature,
    featureId,
    bottomLeftCoordinate,
    topRightCoordinate,
    boundingBoxArea,
    circleCoordinate,
    circleRadius,
    circleArea
  } = action
  switch (type) {
    case INITIALIZE_ORDER:
      return {
        ...initialState
      }
    case SET_ORDER_OPERATION:
      return {
        ...state,
        operation
      }
    case SET_ORDER_DATASOURCE:
      return {
        ...state,
        datasource
      }
    case SET_PRODUCT_NAME:
      return {
        ...state,
        productName
      }
    case SET_ACTIVE_DRAW_FEATURE:
      return {
        ...state,
        feature
      }
    case SET_ACTIVE_DRAW_FEATURE_ID:
      return {
        ...state,
        featureId
      }
    case SET_BOUNDING_BOX_METADATA:
      return {
        ...state,
        bottomLeftCoordinate,
        topRightCoordinate,
        boundingBoxArea
      }
    case CLEAR_BOUNDING_BOX_METADATA:
      return {
        ...state,
        feature: '',
        featureId: '',
        bottomLeftCoordinate: '',
        topRightCoordinate: '',
        boundingBoxArea: ''
      }
    case SET_CIRCLE_METADATA:
      return {
        ...state,
        circleCoordinate,
        circleArea,
        circleRadius
      }
    case CLEAR_CIRCLE_METADATA:
      return {
        ...state,
        feature: '',
        featureId: '',
        circleCoordinate: '',
        circleArea: '',
        circleRadius: ''
      }
    default:
      return state
  }
}
