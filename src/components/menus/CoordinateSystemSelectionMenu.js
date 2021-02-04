import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  List, ListSubheader, ListItem, ListItemIcon, Radio, RadioGroup, FormControlLabel
} from '@material-ui/core'
import { setCoordinateSystem } from '../../actions'

const formats = [
  { name: 'mgrs', label: 'MGRS', value: 'mgrs' },
  { name: 'dms', label: 'DMS', value: 'dms' },
  { name: 'lonLat', label: 'Longitude Latitude', value: 'lonLat' }
]

const styles = theme => ({
  radio: {
    marginRight: theme.spacing(2)
  }
})

class CoordinateSystemSelectionMenu extends Component {
  handleClick = (event) => {
    const { onClose } = this.props
    onClose()
    this.props.setCoordinateSystem(event.target.value)
  }

  render() {
    const { classes } = this.props
    return (
      <List
        component="nav"
        subheader={(
          <ListSubheader>Coordinate Systems</ListSubheader>
        )}
      >
        <RadioGroup value={this.props.system} onChange={event => this.handleClick(event)}>

          {formats.map(format => (
            <ListItem dense key={format.name}>
              <ListItemIcon>
                <FormControlLabel value={format.value} control={<Radio className={classes.radio} color="default" />} label={format.label} />
              </ListItemIcon>
            </ListItem>
          ))}
        </RadioGroup>
      </List>
    )
  }
}

CoordinateSystemSelectionMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setCoordinateSystem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  system: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  system: state.app.system
})

const mapDispatchToProps = ({
  setCoordinateSystem
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CoordinateSystemSelectionMenu))
