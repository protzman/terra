import { makeActionCreator } from '../utils/makeActionCreator'

export const INITIALIZE_ORDER = 'INITIALIZE_ORDER'
export const initializeOrder = makeActionCreator(INITIALIZE_ORDER)

export const SET_ORDER_OPERATION = 'SET_ORDER_OPERATION'
export const setOrderOperation = makeActionCreator(SET_ORDER_OPERATION, 'operation')

export const SET_ORDER_DATASOURCE = 'SET_ORDER_DATASOURCE'
export const setOrderDatasource = makeActionCreator(SET_ORDER_DATASOURCE, 'datasource')

export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME'
export const setProductName = makeActionCreator(SET_PRODUCT_NAME, 'productName')

export const SET_ACTIVE_DRAW_FEATURE = 'SET_ACTIVE_DRAW_FEATURE'
export const setActiveDrawFeature = makeActionCreator(SET_ACTIVE_DRAW_FEATURE, 'feature')

export const SET_ACTIVE_DRAW_FEATURE_ID = 'SET_ACTIVE_DRAW_FEATURE_ID'
export const setActiveDrawFeatureId = makeActionCreator(SET_ACTIVE_DRAW_FEATURE_ID, 'featureId')

export const SET_BOUNDING_BOX_METADATA = 'SET_BOUNDING_BOX_METADATA'
export const setBoundingBoxMetadata = makeActionCreator(SET_BOUNDING_BOX_METADATA, 'bottomLeftCoordinate', 'topRightCoordinate', 'boundingBoxArea')

export const CLEAR_BOUNDING_BOX_METADATA = 'CLEAR_BOUNDING_BOX_METADATA'
export const clearBoundingBoxMetadata = makeActionCreator(CLEAR_BOUNDING_BOX_METADATA)

export const SET_CIRCLE_METADATA = 'SET_CIRCLE_METADATA'
export const setCircleMetadata = makeActionCreator(SET_CIRCLE_METADATA, 'circleCoordinate', 'circleArea', 'circleRadius')

export const CLEAR_CIRCLE_METADATA = 'CLEAR_CIRCLE_METADATA'
export const clearCircleMetadata = makeActionCreator(CLEAR_CIRCLE_METADATA)
