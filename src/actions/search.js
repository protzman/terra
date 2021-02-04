import { makeActionCreator } from '../utils/makeActionCreator'

export const FETCH_SEARCH_RESULTS_REQUEST = 'FETCH_SEARCH_RESULTS_REQUEST'
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS'
export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE'
export const fetchSearchResultsRequest = makeActionCreator(FETCH_SEARCH_RESULTS_REQUEST, 'query')
export const fetchSearchResultsSuccess = makeActionCreator(FETCH_SEARCH_RESULTS_SUCCESS, 'query', 'results')
export const fetchSearchResultsFailure = makeActionCreator(FETCH_SEARCH_RESULTS_FAILURE, 'query', 'error')
