import { makeActionCreator } from '../utils/makeActionCreator'

export const ADD_IMAGE_TO_MAP = 'ADD_IMAGE_TO_MAP'
export const addImageToMap = makeActionCreator(ADD_IMAGE_TO_MAP, 'image')
