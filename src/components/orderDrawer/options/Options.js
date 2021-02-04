import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'

import {
  IconButton,
  Typography,
  Collapse,
  ListItem,
  ListItemSecondaryAction,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

import {
  Add,
  CropSquare,
  CropFree,
  RadioButtonChecked,
  RadioButtonUnchecked
} from '@material-ui/icons'

import { LatLon } from 'geodesy/mgrs.js'
import {
  setViewshedRadius, setObserverHeight, setTargetElevation, setActiveDrawFeature
} from '../../../actions'

import { StyledSlider } from '../../common/StyledSlider'
import BoundingBoxInputs from './BoundingBoxInputs'
import CircleInputs from './CircleInputs'

const styles = theme => ({
  numberInput: {
    height: theme.spacing(7),
    width: theme.spacing(11),
    paddingBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius
  },
  drawerIcon: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.longest
    })
  },
  drawerIconOpen: {
    transform: 'rotate(135deg)'
  },
  gridItem: {
    textAlign: 'center'
  },
  sliderLabel: {
    marginBottom: theme.spacing(-3)
  },
  disabled: {
    color: `${theme.palette.primary.main}50 !important`
  }
})

class Options extends Component {
  setRadiusViewshed = (event) => {
    this.props.setViewshedRadius(Number(event.target.value))
  }

  setSliderRadiusViewshed = (event, radius) => {
    this.props.setViewshedRadius(radius)
  }

  setObserverHeightViewshed = (event) => {
    this.props.setObserverHeight(Number(event.target.value))
  }

  setSliderObserverHeightViewshed = (event, observerHeight) => {
    this.props.setObserverHeight(observerHeight)
  }

  setTargetElevationViewshed = (event) => {
    this.props.setTargetElevation(Number(event.target.value))
  }

  setSliderTargetElevationViewshed = (event, targetElevation) => {
    this.props.setTargetElevation(targetElevation)
  }

  setActiveDrawFeature = (event) => {
    this.props.setActiveDrawFeature(event.target.value)
  }


  handleSliderInputBlur = (event) => {
    const { id, value } = event.target
    if (value < 0) {
      this.setState({ [id]: 0 })
    } else if (value > 100) {
      this.setState({ [id]: 100 })
    }
  }

  getCoordinateLabel = () => {
    switch (this.props.format) {
      case 'dms':
        return 'DMS Coordinate'
      case 'latlon':
        return 'Latitude Longitude'
      case 'mgrs':
        return 'MGRS Coordinate'
      default:
        return ''
    }
  }

  getCoordinateValue = (coordinateValue) => {
    // TODO probably need to add some regex here to check if currently formatted like a ___
    if (coordinateValue) {
      try {
        const latlon = coordinateValue.split(',')
        switch (this.props.format) {
          case 'dms':
            return new LatLon(latlon[0], latlon[1]).toString('dms')
          case 'mgrs':
            const latLon = new LatLon(latlon[0], latlon[1])
            const mgrs = latLon.toUtm().toMgrs()
            return mgrs.toString()

          default:
            return coordinateValue
        }
      } catch (error) {
        return coordinateValue
      }
    }
    return ''
  }

  togglePanel = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  render() {
    const {
      classes,
      operation,
      expanded,
      onClick,
      observerHeight,
      targetElevation,
      activeDrawFeature,
      activeFeatureId
    } = this.props

    let options
    switch (activeDrawFeature) {
      case 'boundingBox':
        options = <BoundingBoxInputs />
        break
      case 'circle':
        options = <CircleInputs />
        break
      default:
        options = (
          <ListItem>
            <Typography variant="caption">error with feature selection</Typography>
          </ListItem>
        )
    }

    return (
      <React.Fragment>
        <ListItem>
          <Typography variant="overline">{`Add ${operation} Feature`}</Typography>
          <ListItemSecondaryAction>
            <IconButton onClick={onClick}>
              <Add
                className={clsx(classes.drawerIcon, {
                  [classes.drawerIconOpen]: expanded
                })}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse unmountOnExit in={expanded}>

          <ListItem>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="caption">Draw Feature on Map</Typography>
              </Grid>
              <Grid item xs className={classes.gridItem}>
                <FormControlLabel
                  value="boundingBox"
                  control={(
                    <Checkbox
                      classes={{ disabled: classes.disabled }}
                      checked={activeDrawFeature === 'boundingBox'}
                      disabled={operation === 'viewshed' || activeFeatureId !== ''}
                      icon={<CropFree />}
                      checkedIcon={<CropSquare />}
                      color="primary"
                      value="boundingBox"
                      onClick={this.props.addInteraction}
                    />
                  )}
                  labelPlacement="end"
                />
              </Grid>

              <Grid item xs className={classes.gridItem}>
                <FormControlLabel
                  disabled
                  value="circle"
                  control={(
                    <Checkbox
                      checked={activeDrawFeature === 'circle'}
                      disabled={activeFeatureId !== ''}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<RadioButtonChecked />}
                      color="primary"
                      value="circle"
                      onClick={this.props.addInteraction}
                    />
                  )}
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          </ListItem>
          {activeDrawFeature !== '' && options}
          <div id="viewshed-sliders">
            {operation === 'viewshed' && (
              <React.Fragment>
                <ListItem>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item xs={12} className={classes.sliderLabel}>
                      <Typography variant="caption">
                        Observer Height (m)
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <StyledSlider
                        id="observerHeight"
                        value={
                          typeof observerHeight === 'number'
                            ? observerHeight
                            : 0
                        }
                        aria-labelledby="input-slider"
                        min={0}
                        max={100}
                        onChange={this.setSliderObserverHeightViewshed}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="observerHeight"
                        value={observerHeight}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                          className: classes.numberInput,
                          disableUnderline: true,
                          inputProps: {
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider'
                          }
                        }}
                        onChange={this.setObserverHeightViewshed}
                        onBlur={this.handleSliderInputBlur}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item xs={12} className={classes.sliderLabel}>
                      <Typography variant="caption">
                        Target Elevation (m)
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <StyledSlider
                        id="targetElevation"
                        value={
                          typeof targetElevation === 'number'
                            ? targetElevation
                            : 0
                        }
                        aria-labelledby="input-slider"
                        min={0}
                        max={2500}
                        onChange={this.setSliderTargetElevationViewshed}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="targetElevation"
                        value={targetElevation}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                          className: classes.numberInput,
                          disableUnderline: true,
                          inputProps: {
                            step: 1,
                            min: 0,
                            max: 2500,
                            type: 'number',
                            'aria-labelledby': 'input-slider'
                          }
                        }}
                        onChange={this.setTargetElevationViewshed}
                        onBlur={this.handleSliderInputBlur}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </React.Fragment>
            )}
          </div>
        </Collapse>
      </React.Fragment>
    )
  }
}

Options.propTypes = {
  classes: PropTypes.object.isRequired,
  operation: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  observerHeight: PropTypes.number.isRequired,
  targetElevation: PropTypes.number.isRequired,
  activeDrawFeature: PropTypes.string.isRequired,
  setViewshedRadius: PropTypes.func.isRequired,
  setObserverHeight: PropTypes.func.isRequired,
  setTargetElevation: PropTypes.func.isRequired,
  setActiveDrawFeature: PropTypes.func.isRequired,
  addInteraction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  operation: state.order.operation,
  format: state.order.format,
  radius: state.viewshed.radius,
  observerHeight: state.viewshed.observerHeight,
  targetElevation: state.viewshed.targetElevation,
  activeDrawFeature: state.order.feature,
  activeFeatureId: state.order.featureId
})

const mapDispatchToProps = {
  setViewshedRadius,
  setObserverHeight,
  setTargetElevation,
  setActiveDrawFeature
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Options)
