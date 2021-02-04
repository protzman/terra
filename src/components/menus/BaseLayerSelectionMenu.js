import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import {
  List, ListSubheader, ListItem, ListItemIcon, Radio, RadioGroup, FormControlLabel
} from '@material-ui/core'

import { setBasemap } from '../../actions'
import { basemaps } from '../map/config'


const styles = theme => ({
  radio: {
    marginRight: theme.spacing(2)
  }
})

class BaseLayerSelectionMenu extends Component {
  handleClick = (event) => {
    const { onClose } = this.props
    onClose()
    const basemapObj = basemaps.filter(map => (map.value === event.target.value))
    this.props.setBasemap(basemapObj[0])
  }

  render() {
    const { classes } = this.props
    return (

      <List
        component="nav"
        subheader={(
          <ListSubheader>Basemaps</ListSubheader>
        )}
      >
        <RadioGroup value={this.props.basemap.value} onChange={event => this.handleClick(event)}>
          {basemaps.map(basemap => (
            <ListItem dense key={basemap.name}>
              <ListItemIcon>
                <FormControlLabel value={basemap.value} control={<Radio className={classes.radio} color="default" />} label={basemap.label} />
              </ListItemIcon>
            </ListItem>
          ))}
        </RadioGroup>
      </List>
    )
  }
}

BaseLayerSelectionMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setBasemap: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  basemap: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  basemap: state.app.basemap
})

const mapDispatchToProps = ({
  setBasemap
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(BaseLayerSelectionMenu)
