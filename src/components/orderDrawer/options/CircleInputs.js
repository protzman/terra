import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid, ListItem, Typography
} from '@material-ui/core'
import InputRow from '../../common/InputRow'
import { getCoordinateValue } from '../../../utils/mapFunctions'

const styles = theme => ({
  helperText: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary
  },
  grid: {
    padding: theme.spacing(0, 2)
  }
})

class CircleInputs extends Component {
  getArea = () => {
    const { units, circleArea } = this.props
    if (units === 'imperial') {
      return (circleArea * 0.38610).toFixed(4)
    }
    return circleArea
  }

  getRadius = () => {
    const { units, circleRadius } = this.props
    if (units === 'imperial') {
      return (circleRadius * 0.621371).toFixed(4)
    }
    return circleRadius
  }

  render() {
    const {
      classes,
      units,
      system,
      circleCoordinate
    } = this.props
    return (
      <React.Fragment>
        <ListItem>
          <Typography variant="caption">Circle</Typography>
        </ListItem>
        <ListItem>
          <InputRow
            type="text"
            label="Center"
            name="center"
            value={getCoordinateValue(circleCoordinate, system)}
          />
        </ListItem>
        <Grid
          container
          spacing={2}
          alignItems="center"
          className={classes.grid}
        >

          <Grid item xs>
            <ListItem disableGutters>
              <InputRow
                readOnly
                type="text"
                label="Area"
                name="area"
                value={this.getArea()}
                adornmentType="string"
                endAdornment={`${units === 'metric' ? 'km' : 'mi'}${String.fromCharCode(178)}`}
              />
            </ListItem>
          </Grid>
          <Grid item xs>
            <ListItem disableGutters>
              <InputRow
                readOnly
                type="text"
                label="Radius"
                name="area"
                value={this.getRadius()}
                adornmentType="string"
                endAdornment={`${units === 'metric' ? 'km' : 'mi'}`}
              />
            </ListItem>
          </Grid>
        </Grid>
        <ListItem dense>
          <Typography variant="caption" className={classes.helperText}>
            * approximate values based on map projection and conversions
          </Typography>
        </ListItem>
      </React.Fragment>
    )
  }
}

CircleInputs.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.string.isRequired,
  system: PropTypes.string.isRequired,
  circleCoordinate: PropTypes.string.isRequired,
  circleRadius: PropTypes.string.isRequired,
  circleArea: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  units: state.app.units,
  system: state.app.system,
  circleCoordinate: state.order.circleCoordinate,
  circleArea: state.order.circleArea,
  circleRadius: state.order.circleRadius
})

const mapDispatchToProps = {
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(CircleInputs)
