
import Mgrs, { LatLon } from 'geodesy/mgrs.js'
import Dms from 'geodesy/dms.js'
import { dmsRegex, mgrsRegex, latLonRegex } from '../resources/constants'

const dmsRegexp = new RegExp(dmsRegex)
const latLongRegexp = new RegExp(latLonRegex)
const mgrsRegexp = new RegExp(mgrsRegex)

export const convertCoordinates = (coord, system) => {
  switch (system) {
    case 'dms':
      // dms to lonlat
      try {
        if (dmsRegexp.test(coord)) {
          const latLon = coord.split(',')
          const lat = Dms.parse(latLon[0])
          const lon = Dms.parse(latLon[1])
          const latLonCoordinate = new LatLon(lat, lon)
          return `${latLonCoordinate.lat},${latLonCoordinate.lon}`
        }
      } catch (error) {
        return ''
      }
      break
    case 'lonLat':
      if (latLongRegexp.test(coord)) {
        return coord
      }
      return ''

    case 'mgrs':
      // mgrs to lonlat
      try {
        if (mgrsRegexp.test(coord)) {
          const mgrs = Mgrs.parse(coord)
          const latLonCoordinate = mgrs.toUtm().toLatLon()
          return `${latLonCoordinate.lat},${latLonCoordinate.lon}`
        }
      } catch (error) {
        return ''
      }
      break
    default:
      return ''
  }
}

export const getCoordinateValue = (lonLat, system) => {
  const coordinates = lonLat.split(',')
  try {
    switch (system) {
      case 'dms':
        return new LatLon(coordinates[1], coordinates[0]).toString('dms')
      case 'mgrs':
        console.log(lonLat)
        const latLon = new LatLon(coordinates[1], coordinates[0])
        console.log(latLon)
        console.log('--------------')
        const mgrs = latLon.toUtm().toMgrs()
        return mgrs.toString()
      default:
        return lonLat
    }
  } catch (error) {
    return lonLat
  }
}
