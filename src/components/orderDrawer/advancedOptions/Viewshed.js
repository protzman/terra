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
  setRefractionCoefficient,
  setOutputFormat,
  setViewshedLayerStyle
} from '../../../actions'

const outputFormats = [
  { name: 'binary', label: 'Binary', value: 'binary' },
  { name: 'elevation', label: 'Elevation', value: 'elevation' }
]

const layerStyles = [
  { name: 'greenscale', label: 'Greenscale', value: 'greenscale' },
  { name: 'redscale', label: 'Redscale', value: 'redscale' },
  { name: 'binaryGreen', label: 'Binary Green', value: 'binary_green' },
  { name: 'binaryPink', label: 'Binary Pink', value: 'binary_pink' }
]

const styles = theme => ({
  numberInput: {
    height: theme.spacing(7),
    width: theme.spacing(11),
    paddingBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius
  }
})

class Viewshed extends Component {
  setRefractionCoefficient = (event) => {
    this.props.setRefractionCoefficient(Number(event.target.value))
  }

  setSliderRefractionCoefficient = (event, refractionCoefficient) => {
    this.props.setRefractionCoefficient(refractionCoefficient)
  }

  handleChangeOutputFormat = (event) => {
    this.props.setOutputFormat(event.target.value)
  }

  handleChangeLayerStyle = (event) => {
    this.props.setViewshedLayerStyle(event.target.value)
  }

  render() {
    const {
      classes,
      refractionCoefficient,
      outputFormat,
      layerStyle
    } = this.props
    return (
      <React.Fragment>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="caption">Refraction Coefficient</Typography>
            </Grid>
            <Grid item xs>
              <StyledSlider
                id="refractionCoefficient"
                value={
                  typeof refractionCoefficient === 'number'
                    ? refractionCoefficient
                    : 0
                }
                aria-labelledby="input-slider"
                step={0.01}
                min={0}
                max={1}
                onChange={this.setSliderRefractionCoefficient}
              />
            </Grid>
            <Grid item>
              <TextField
                id="refractionCoefficient"
                value={refractionCoefficient}
                variant="filled"
                InputProps={{
                  className: classes.numberInput,
                  disableUnderline: true,
                  inputProps: {
                    step: 0.01,
                    min: 0,
                    max: 1,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }
                }}
                onChange={this.setRefractionCoefficient}
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
                label="Output Format"
                name="outputFormat"
                options={outputFormats}
                selected={outputFormat}
                handleChange={this.handleChangeOutputFormat}
              />
            </Grid>
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

Viewshed.propTypes = {
  classes: PropTypes.object.isRequired,
  refractionCoefficient: PropTypes.number.isRequired,
  outputFormat: PropTypes.string.isRequired,
  layerStyle: PropTypes.string.isRequired,
  setRefractionCoefficient: PropTypes.func.isRequired,
  setOutputFormat: PropTypes.func.isRequired,
  setViewshedLayerStyle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  refractionCoefficient: state.viewshed.refractionCoefficient,
  outputFormat: state.viewshed.outputFormat,
  layerStyle: state.viewshed.layerStyle
})

const mapDispatchToProps = {
  setRefractionCoefficient,
  setOutputFormat,
  setViewshedLayerStyle
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Viewshed)
