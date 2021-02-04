import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Typography,
  ListItem,
  Grid,
  TextField
} from '@material-ui/core'
import InputRow from '../../common/InputRow'
import { StyledSlider } from '../../common/StyledSlider'

import { setSunAltitudeAngle, setSunAzimuth, setHillshadeLayerStyle } from '../../../actions'

const layerStyles = [
  { name: 'greyscale', label: 'Greyscale', value: 'greyscale' }
]

const styles = theme => ({
  numberInput: {
    height: theme.spacing(7),
    width: theme.spacing(11),
    paddingBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius
  }
})

class Hillshade extends Component {
  handleChangeSunAltitudeAngle = (event) => {
    this.props.setSunAltitudeAngle(Number(event.target.value))
  }

  handleChangeSliderSunAltitudeAngle = (event, sunAltitudeAngle) => {
    this.props.setSunAltitudeAngle(sunAltitudeAngle)
  }

  handleChangeSunAzimuth = (event) => {
    this.props.setSunAzimuth(Number(event.target.value))
  }

  handleChangeSliderSunAzimuth = (event, sunAzimuth) => {
    this.props.setSunAzimuth(sunAzimuth)
  }

  handleChangeLayerStyle = (event) => {
    this.props.setHillshadeLayerStyle(event.target.value)
  }

  render() {
    const {
      classes, sunAltitudeAngle, sunAzimuth, layerStyle
    } = this.props
    return (
      <React.Fragment>
        <ListItem>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="caption">Sun Altitude Angle</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="sunAltitudeAngle"
                value={typeof sunAltitudeAngle === 'number' ? sunAltitudeAngle : 0}
                aria-labelledby="input-slider"
                step={1}
                min={0}
                max={90}
                onChange={this.handleChangeSliderSunAltitudeAngle}
              />
            </Grid>
            <Grid item>
              <TextField
                id="sunAltitudeAngle"
                value={sunAltitudeAngle}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 1,
                    min: 0,
                    max: 90,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.handleChangeSunAltitudeAngle}
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
            <Grid item xs={12}>
              <Typography variant="caption">Sun Azimuth</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="sunAzimuth"
                value={typeof sunAzimuth === 'number' ? sunAzimuth : 0}
                aria-labelledby="input-slider"
                step={1}
                min={0}
                max={360}
                onChange={this.handleChangeSliderSunAzimuth}
              />
            </Grid>
            <Grid item>
              <TextField
                id="sunAzimuth"
                value={sunAzimuth}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 1,
                    min: 0,
                    max: 360,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.handleChangeSunAzimuth}
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

Hillshade.propTypes = {
  classes: PropTypes.object.isRequired,
  sunAltitudeAngle: PropTypes.number.isRequired,
  sunAzimuth: PropTypes.number.isRequired,
  layerStyle: PropTypes.string.isRequired,
  setSunAltitudeAngle: PropTypes.func.isRequired,
  setSunAzimuth: PropTypes.func.isRequired,
  setHillshadeLayerStyle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  sunAltitudeAngle: state.hillshade.sunAltitudeAngle,
  sunAzimuth: state.hillshade.sunAzimuth,
  layerStyle: state.hillshade.layerStyle
})

const mapDispatchToProps = {
  setSunAltitudeAngle,
  setSunAzimuth,
  setHillshadeLayerStyle
}

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(Hillshade)
