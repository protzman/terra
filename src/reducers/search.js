import {
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE
} from '../actions'

const initialState = {
  query: '',
  results: [],
  fetching: false,
  error: null
}

export default function search(state = initialState, action) {
  const {
    type,
    query,
    results,
    error
  } = action
  switch (type) {
    case FETCH_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        fetching: true,
        query
      }
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        results
      }
    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error
      }
    default:
      return state
  }
}
