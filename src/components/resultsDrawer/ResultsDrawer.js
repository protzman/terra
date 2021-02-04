import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Drawer,
  List,
  ListItem,
  Typography
} from '@material-ui/core'
import Result from './Result'

const drawerWidth = 650

const styles = theme => ({
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    border: 'none',
    width: drawerWidth
  },
  drawerSpacer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
})

class ResultsDrawer extends Component {
  render() {
    const {
      open,
      classes,
      results,
      query
    } = this.props
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerSpacer} />
        <List>
          <ListItem>
            <Typography variant="overline">Search Results</Typography>
          </ListItem>
          {results.length > 0 ? (results.map(result => (
            <Result
              key={result.place_id}
              result={result}
            />
          )))
            : (
              <ListItem>
                <Typography variant="caption">
                  {`no search results for ${query}...`}
                </Typography>
              </ListItem>
            )}
        </List>
        <div className={classes.drawerSpacer} />
      </Drawer>
    )
  }
}

ResultsDrawer.defaultProps = {
  results: []
}

ResultsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  results: PropTypes.array,
  query: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  results: state.search.results,
  query: state.search.query
})

const mapDispatchToProps = ({})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(ResultsDrawer)
