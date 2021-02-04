import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Grid, ListItem, Typography } from '@material-ui/core'
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

class BoundingBoxInputs extends Component {
  getArea = () => {
    const { units, boundingBoxArea } = this.props
    if (units === 'imperial') {
      return (boundingBoxArea * 0.38610).toFixed(4)
    }
    return boundingBoxArea
  }

  render() {
    const {
      classes,
      units,
      system,
      bottomLeftCoordinate,
      topRightCoordinate
    } = this.props
    return (
      <React.Fragment>
        <ListItem>
          <Typography variant="caption">Bounding Box</Typography>
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
                label="Bottom Left"
                name="bottomLeftCoordinate"
                value={getCoordinateValue(bottomLeftCoordinate, system)}
              />
            </ListItem>
          </Grid>
          <Grid item xs>
            <ListItem disableGutters>
              <InputRow
                readOnly
                type="text"
                label="Top Right"
                name="topRightCoordinate"
                value={getCoordinateValue(topRightCoordinate, system)}
              />
            </ListItem>
          </Grid>
        </Grid>
        <ListItem>
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
        <ListItem dense>
          <Typography variant="caption" className={classes.helperText}>
            * approximate values based on map projection and conversions
          </Typography>
        </ListItem>
      </React.Fragment>
    )
  }
}

BoundingBoxInputs.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.string.isRequired,
  system: PropTypes.string.isRequired,
  bottomLeftCoordinate: PropTypes.string.isRequired,
  topRightCoordinate: PropTypes.string.isRequired,
  boundingBoxArea: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  units: state.app.units,
  system: state.app.system,
  boundingBoxArea: state.order.boundingBoxArea,
  bottomLeftCoordinate: state.order.bottomLeftCoordinate,
  topRightCoordinate: state.order.topRightCoordinate
})

const mapDispatchToProps = {}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(BoundingBoxInputs)
