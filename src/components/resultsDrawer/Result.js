import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import {
  Typography,
  ListItem,
  ListItemIcon,
  Tooltip
} from '@material-ui/core'
import {
  RoomOutlined
} from '@material-ui/icons'

import {
  setActiveMapItem
} from '../../actions'


class Result extends Component {
  handleZoomToResult = () => {
    const { boundingbox } = this.props.result
    // put in format bot-left, top-right
    const bbox = [boundingbox[2], boundingbox[0], boundingbox[3], boundingbox[1]]
    this.props.setActiveMapItem(bbox)
  }

  render() {
    const { result } = this.props
    return (
      <React.Fragment>
        <ListItem dense button onClick={this.handleZoomToResult}>
          <ListItemIcon >
            <Tooltip
              title="Zoom To Result"
              placement="left"
              aria-label="zoomToResult"
            >
              <RoomOutlined color="inherit" />
            </Tooltip>
          </ListItemIcon>
          <Typography variant="overline">
            {result.display_name}
          </Typography>
        </ListItem>

      </React.Fragment>
    )
  }
}

Result.propTypes = {
  result: PropTypes.object.isRequired,
  setActiveMapItem: PropTypes.func.isRequired
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
  setActiveMapItem
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Result)
