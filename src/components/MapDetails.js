import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  AppBar,
  Menu,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  LinearProgress,
  Tooltip
} from '@material-ui/core'
import {
  Add,
  Remove,
  Layers,
  ArrowDropUp
} from '@material-ui/icons'
import clsx from 'clsx'

import { setUnits } from '../actions'
import CoordinateSystemSelectionMenu from './menus/CoordinateSystemSelectionMenu'
import BaseLayerSelectionMenu from './menus/BaseLayerSelectionMenu'
import Banner from './common/Banner'
import { getCoordinateValue } from '../utils/mapFunctions'

const styles = theme => ({
  data: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.mono.fontFamily
  },
  toolbarItem: {
    marginLeft: theme.spacing(2)
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer + 1,
    top: 'auto',
    bottom: 24,
    height: 50
  },
  menu: {
    marginTop: theme.spacing(-3)
  },
  spacer: {
    flex: 1
  },
  appBarButton: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 2)
  },
  progress: {
    zIndex: theme.zIndex.drawer + 2
  },
  progressHidden: {
    visibility: 'hidden'
  }
})

class MapDetails extends Component {
  state = {
    coordinateSystemAnchor: null,
    baseLayerAnchor: null
  }

  handleToggleUnits = (checked) => {
    if (checked) {
      this.props.setUnits('imperial')
    } else {
      this.props.setUnits('metric')
    }
  }
  openCoordinateMenu = (event) => {
    this.setState({ coordinateSystemAnchor: event.currentTarget })
  }

  openBaselayerMenu = (event) => {
    this.setState({ baseLayerAnchor: event.currentTarget })
  }

  closeMenu = () => {
    this.setState({
      coordinateSystemAnchor: null,
      baseLayerAnchor: null
    })
  }
  render() {
    const {
      classes,
      zoomIn,
      zoomOut,
      lon,
      lat,
      system,
      units,
      progress
    } = this.props
    const { coordinateSystemAnchor, baseLayerAnchor } = this.state
    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <LinearProgress className={clsx(classes.progress, { [classes.progressHidden]: progress === 0 })} variant="determinate" value={progress} color="secondary" />
          <Toolbar variant="dense">
            <div id="scaleLine" className={classes.toolbarItem} />
            <div className={classes.spacer} />
            <Typography
              noWrap
              className={classes.data}
              variant="caption"
            >
              {getCoordinateValue(`${lon},${lat}`, system)}
            </Typography>
            <Tooltip title="Coordinate System" aria-label="coordinateSystem">
              <IconButton
                className={classes.appBarButton}
                edge="end"
                color="inherit"
                size="small"
                onClick={this.openCoordinateMenu}
              >
                <ArrowDropUp />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom In" aria-label="zoomIn">
              <IconButton
                className={classes.appBarButton}
                edge="end"
                color="inherit"
                size="small"
                onClick={zoomIn}
              >
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out" aria-label="zoomOut">
              <IconButton
                className={classes.appBarButton}
                edge="end"
                color="inherit"
                size="small"
                onClick={zoomOut}
              >
                <Remove />
              </IconButton>
            </Tooltip>
            <Tooltip title="Map Layers" aria-label="mapLayers">
              <IconButton
                className={classes.appBarButton}
                edge="end"
                color="inherit"
                size="small"
                onClick={this.openBaselayerMenu}
              >
                <Layers />
              </IconButton>
            </Tooltip>
            <Typography
              noWrap
              className={clsx(classes.data, classes.toolbarItem)}
              variant="caption"
            >
              METRIC
            </Typography>
            <Switch
              className={classes.toolbarItem}
              edge="end"
              color="secondary"
              checked={units === 'imperial'}
              onChange={e => this.handleToggleUnits(e.target.checked)}
            />
            <Typography
              noWrap
              className={clsx(classes.data, classes.toolbarItem)}
              variant="caption"
            >
              IMPERIAL
            </Typography>
          </Toolbar>
        </AppBar>
        <Banner position="bottom" />
        <Menu
          className={classes.menu}
          anchorEl={coordinateSystemAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={Boolean(coordinateSystemAnchor)}
          onClose={this.closeMenu}
        >
          <CoordinateSystemSelectionMenu
            onClose={this.closeMenu}
          />
        </Menu>
        <Menu
          className={classes.menu}
          anchorEl={baseLayerAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={Boolean(baseLayerAnchor)}
          onClose={this.closeMenu}
        >
          <BaseLayerSelectionMenu
            onClose={this.closeMenu}
          />
        </Menu>
      </div>
    )
  }
}

MapDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
  lon: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  system: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  setUnits: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  units: state.app.units,
  system: state.app.system
})

const mapDispatchToProps = { setUnits }

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(MapDetails)
