import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Typography, ListItem, Grid, TextField
} from '@material-ui/core'
import InputRow from '../../common/InputRow'
import { StyledSlider } from '../../common/StyledSlider'

import {
  setAirframe,
  setMaxAllowableSlope,
  setMaxIdealSlope,
  setMaxAllowableElevation,
  setLandingRadius,
  setHlzLayerStyle
} from '../../../actions'

const airframes = [
  { name: 'mh6', label: 'MH-6', value: 'mh6' },
  { name: 'uh60mh60', label: 'UH-60 / MH-60', value: 'uh60mh60' },
  { name: 'ch47mh47', label: 'CH-47 / MH 47', value: 'ch47mh47' }
]

const layerStyles = [
  { name: 'stoplight', label: 'Stoplight', value: 'stoplight' },
  { name: 'transparentStoplight', label: 'Transparent Stoplight', value: 'transparent_stoplight' }
]

const styles = theme => ({
  helperText: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary
  },
  numberInput: {
    height: theme.spacing(7),
    width: theme.spacing(11),
    paddingBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius
  }
})

class Hlz extends Component {
  handleChangeMaxAllowableSlope = (event) => {
    this.props.setMaxAllowableSlope(Number(event.target.value))
  }

  handleChangeSliderMaxAllowableSlope = (event, maxAllowableSlope) => {
    this.props.setMaxAllowableSlope(maxAllowableSlope)
  }

  handleChangeMaxIdealSlope = (event) => {
    this.props.setMaxIdealSlope(Number(event.target.value))
  }

  handleChangeSliderMaxIdealSlope = (event, maxIdealSlope) => {
    this.props.setMaxIdealSlope(maxIdealSlope)
  }

  handleChangeMaxAllowableElevation = (event) => {
    this.props.setMaxAllowableElevation(Number(event.target.value))
  }

  handleChangeSliderMaxAllowableElevation = (event, maxAllowableElevation) => {
    this.props.setMaxAllowableElevation(maxAllowableElevation)
  }

  handleChangeLandingRadius = (event) => {
    this.props.setLandingRadius(Number(event.target.value))
  }

  handleChangeSliderLandingRadius = (event, landingRadius) => {
    this.props.setLandingRadius(landingRadius)
  }

  handleChangeAirframe = (event) => {
    this.props.setAirframe(event.target.value)
  }

  handleChangeLayerStyle = (event) => {
    this.props.setHlzLayerStyle(event.target.value)
  }

  render() {
    const {
      classes,
      airframe,
      maxAllowableSlope,
      maxIdealSlope,
      maxAllowableElevation,
      landingRadius,
      layerStyle
    } = this.props

    return (
      <React.Fragment>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <InputRow
                type="select"
                label="Airframe"
                name="airframe"
                options={airframes}
                selected={airframe}
                handleChange={this.handleChangeAirframe}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem dense>
          <Typography variant="caption" className={classes.helperText}>
            * select an airframe to get known preset values for an hlz
          </Typography>
        </ListItem>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="caption">Landing Radius</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="landingRadius"
                value={typeof landingRadius === 'number' ? landingRadius : 0}
                aria-labelledby="input-slider"
                step={1}
                min={0}
                max={50}
                onChange={this.handleChangeSliderLandingRadius}
              />
            </Grid>
            <Grid item>
              <TextField
                id="landingRadius"
                value={landingRadius}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 1,
                    min: 0,
                    max: 50,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.handleChangeLandingRadius}
                onBlur={this.handleSliderInputBlur}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="caption">Max Allowable Slope</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="maxAllowableSlope"
                value={
                  typeof maxAllowableSlope === 'number' ? maxAllowableSlope : 0
                }
                aria-labelledby="input-slider"
                step={1}
                min={0}
                max={60}
                onChange={this.handleChangeSliderMaxAllowableSlope}
              />
            </Grid>
            <Grid item>
              <TextField
                id="maxAllowableSlope"
                value={maxAllowableSlope}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 1,
                    min: 0,
                    max: 60,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.handleChangeAllowableSlope}
                onBlur={this.handleSliderInputBlur}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="caption">Max Ideal Slope</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="maxIdealSlope"
                value={typeof maxIdealSlope === 'number' ? maxIdealSlope : 0}
                aria-labelledby="input-slider"
                step={1}
                min={0}
                max={60}
                onChange={this.handleChangeSliderMaxIdealSlope}
              />
            </Grid>
            <Grid item>
              <TextField
                id="maxIdealSlope"
                value={maxIdealSlope}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 1,
                    min: 0,
                    max: 60,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.handleChangeMaxIdealSlope}
                onBlur={this.handleSliderInputBlur}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="caption">Max Allowable Elevation</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="maxAllowableElevation"
                value={
                  typeof maxAllowableElevation === 'number'
                    ? maxAllowableElevation
                    : 0
                }
                aria-labelledby="input-slider"
                step={5}
                min={0}
                max={10000}
                onChange={this.handleChangeSliderMaxAllowableElevation}
              />
            </Grid>
            <Grid item>
              <TextField
                id="maxAllowableElevation"
                value={maxAllowableElevation}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 5,
                    min: 0,
                    max: 10000,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.handleChangeMaxAllowableElevation}
                onBlur={this.handleSliderInputBlur}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <InputRow
                type="select"
                label="Layer Style"
                name="layerStyle"
                options={layerStyles}
                selected={layerStyle}
                handleChange={this.handleChangeLayerStyle}
              />
            </Grid>
          </Grid>
        </ListItem>
      </React.Fragment>
    )
  }
}

Hlz.propTypes = {
  classes: PropTypes.object.isRequired,
  airframe: PropTypes.string.isRequired,
  maxAllowableSlope: PropTypes.number.isRequired,
  maxIdealSlope: PropTypes.number.isRequired,
  maxAllowableElevation: PropTypes.number.isRequired,
  landingRadius: PropTypes.number.isRequired,
  layerStyle: PropTypes.string.isRequired,
  setAirframe: PropTypes.func.isRequired,
  setMaxAllowableSlope: PropTypes.func.isRequired,
  setMaxIdealSlope: PropTypes.func.isRequired,
  setMaxAllowableElevation: PropTypes.func.isRequired,
  setLandingRadius: PropTypes.func.isRequired,
  setHlzLayerStyle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  airframe: state.hlz.airframe,
  maxAllowableSlope: state.hlz.maxAllowableSlope,
  maxIdealSlope: state.hlz.maxIdealSlope,
  maxAllowableElevation: state.hlz.maxAllowableElevation,
  landingRadius: state.hlz.landingRadius,
  layerStyle: state.hlz.layerStyle
})

const mapDispatchToProps = {
  setAirframe,
  setMaxAllowableSlope,
  setMaxIdealSlope,
  setMaxAllowableElevation,
  setLandingRadius,
  setHlzLayerStyle
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Hlz)
