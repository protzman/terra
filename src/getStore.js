import { createStore, applyMiddleware, compose } from 'redux'

import { createLogger } from 'redux-logger'
import { Iterable } from 'immutable'

import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'


const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS()
  return state
}

const logger = createLogger({
  collapsed: true,
  stateTransformer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, logger]
  const composables = [applyMiddleware(...middlewares)]
  const store = createStore(rootReducer, composeEnhancers(...composables))
  sagaMiddleware.run(rootSaga)
  return store
}
