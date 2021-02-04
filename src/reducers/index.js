import { combineReducers } from 'redux'
import app from './app'
import order from './order'
import viewshed from './viewshed'
import hillshade from './hillshade'
import hlz from './hlz'
import map from './map'
import job from './job'
import search from './search'

export default combineReducers({
  app, order, viewshed, hillshade, hlz, map, job, search
})
