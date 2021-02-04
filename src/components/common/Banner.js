import React, { Component } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { AppBar, Typography } from '@material-ui/core'
import { environment, disclaimer } from '../../resources/constants'


const styles = theme => ({
  bannerTop: {
    background: `${theme.palette.background[environment]}`,
    zIndex: theme.zIndex.drawer + 1,
    alignItems: 'center',
    height: 24
  },
  bannerBot: {
    background: `${theme.palette.background[environment]}`,
    zIndex: theme.zIndex.drawer + 1,
    alignItems: 'center',
    height: 24,
    top: 'auto',
    bottom: 0
  },
  bannerText: {
    lineHeight: 2
  }
})

class Banner extends Component {
  render() {
    const { classes, position } = this.props
    return (
      <AppBar
        position="fixed"
        className={clsx({
          [classes.bannerTop]: position === 'top',
          [classes.bannerBot]: position === 'bottom'
        })}
      >
        <Typography variant="overline" className={classes.bannerText}>
          {disclaimer}
        </Typography>
      </AppBar>
    )
  }
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired
}
export default withStyles(styles)(Banner)
