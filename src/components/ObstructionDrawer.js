import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import {
  HomeWork,
  Landscape,
  Waves
} from '@material-ui/icons'
import {
  setObstructionDrawerOpen
} from '../actions'

const drawerWidth = 550

const styles = () => ({
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
    position: 'absolute',
    left: `calc(50% - ${drawerWidth / 2}px)`
  },
  multiline: {
    display: 'grid'
  }
})

class ObstructionDrawer extends Component {
  translateDate = (date) => {
    const y = date.substring(0, 4)
    const m = date.substring(5, 7)
    const d = date.substring(6, 8)
    return new Date(y, m, d).toDateString()
  }

  render() {
    const {
      open,
      classes,
      activeDvofItem
    } = this.props
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {activeDvofItem !== null && (
          <List disablePadding>
            <ListItem dense>
              <ListItemText
                classes={{ multiline: classes.multiline }}
                primary={`${activeDvofItem.dvofItem.TYPENAME} obstruction on ${activeDvofItem.id}`}
                primaryTypographyProps={{
                  variant: 'overline'
                }}
                secondary={`Lastest Revision : ${this.translateDate(activeDvofItem.dvofItem.REVISIONDT)}`}
                secondaryTypographyProps={{
                  variant: 'overline'
                }}
              />
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <HomeWork />
              </ListItemIcon>
              <ListItemText
                primary={activeDvofItem.dvofItem.FACNAME}
                primaryTypographyProps={{
                  variant: 'overline'
                }}
              />
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <Landscape />
              </ListItemIcon>
              <ListItemText
                primary={`Height above ground level : ${(parseInt(activeDvofItem.dvofItem.HEIGHTAGL) * 0.3048).toFixed(1)} m`}
                primaryTypographyProps={{
                  variant: 'overline'
                }}
              />
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <Waves />
              </ListItemIcon>
              <ListItemText
                primary={`Height above mean sea level : ${(parseInt(activeDvofItem.dvofItem.HEIGHTAMSL) * 0.3048).toFixed(1)} m`}
                primaryTypographyProps={{
                  variant: 'overline'
                }}
              />
            </ListItem>
          </List>
        )}
      </Drawer>
    )
  }
}

ObstructionDrawer.defaultProps = {
  activeDvofItem: null
}


ObstructionDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  activeDvofItem: PropTypes.object
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setObstructionDrawerOpen
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(ObstructionDrawer)
