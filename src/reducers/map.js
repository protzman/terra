import { ADD_IMAGE_TO_MAP } from '../actions'

export default function map(state = {
  images: []
}, action) {
  const { type, image } = action
  switch (type) {
    case ADD_IMAGE_TO_MAP:
      return {
        ...state,
        images: [
          ...state.images,
          image
        ]
      }
    default:
      return state
  }
}
