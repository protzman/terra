import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import {
  Typography,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Divider,
  Tooltip
} from '@material-ui/core'
import {
  Close,
  VisibilityOutlined,
  VisibilityOffOutlined,
  CloudDownloadOutlined,
  RoomOutlined,
  AddPhotoAlternateOutlined,
  ErrorOutline,
  CheckCircleOutline
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { StyledSlider } from './common/StyledSlider'
import {
  setJobOpacity,
  setJobVisibility,
  openExportDialog,
  setActiveMapItem
} from '../actions'

const styles = theme => ({
  inset: {
    padding: theme.spacing(0, 7)
  },
  gridItem: {
    textAlign: 'center',
    alignItems: 'center'
  },
  circle: {
    // hard coded because skeleton is messed up
    marginLeft: '8.5px'
  },
  rectangle: {
    borderRadius: theme.shape.borderRadius
  }
})

class Job extends Component {
  getStatusIcon = (status) => {
    switch (status) {
      case 'finished':
        return <CheckCircleOutline />
      case 'error':
        return <ErrorOutline />
      default:
        return <CircularProgress size={24} thickness={2} />
    }
  }

  handleChangeSliderOpacity = (event, opacity) => {
    this.props.setJobOpacity(this.props.id, opacity)
  }

  handleToggleVisibility = () => {
    this.props.setJobVisibility(this.props.id, !this.props.visibility)
  }


  handleExport = () => {
    this.props.openExportDialog(this.props.id, this.props.metadata)
  }

  handleZoomToLayer = () => {
    const { bbox } = this.props.metadata
    // since we're visually using lon lat, flip the coordinates to appear the same
    const flipped = [bbox[1], bbox[0], bbox[3], bbox[2]]
    this.props.setActiveMapItem(flipped)
  }

  render() {
    const {
      classes,
      id,
      metadata,
      status,
      opacity,
      visibility,
      handleDelete
    } = this.props
    return (
      <React.Fragment>
        <ListItem dense>
          <ListItemIcon>{this.getStatusIcon(status)}</ListItemIcon>
          <ListItemText
            primary={metadata.productName}
            primaryTypographyProps={{
              variant: 'overline'
            }}
            secondary={status}
          />
          <ListItemSecondaryAction>
            <IconButton
              disabled={status !== 'finished' && status !== 'error'}
              onClick={() => handleDelete(id, metadata)}
            >
              <Tooltip title="Delete Layer" aria-label="deleteLayer">
                <Close color="inherit" />
              </Tooltip>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {status === 'finished' ? (
          <ListItem>
            <Grid container spacing={2} className={classes.inset}>
              <Grid item xs={12}>
                <Typography variant="caption">
                  Image Opacity
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <StyledSlider
                  disabled={status !== 'finished'}
                  id="opacity"
                  value={typeof opacity === 'number' ? opacity : 0}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={this.handleChangeSliderOpacity}
                />
              </Grid>
              <Grid item xs className={classes.gridItem}>
                <Tooltip title="Toggle Layer Visibilty" aria-label="toggleLayerVisibility">

                  <IconButton onClick={this.handleToggleVisibility}>
                    {visibility ? <VisibilityOutlined color="inherit" />
                      : <VisibilityOffOutlined color="inherit" />}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs className={classes.gridItem}>
                <Tooltip title="Export Layer" aria-label="exportLayer">
                  <IconButton onClick={this.handleExport}>
                    <CloudDownloadOutlined color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs className={classes.gridItem}>
                <Tooltip title="Zoom To Layer" aria-label="zoomToLayer">
                  <IconButton onClick={this.handleZoomToLayer}>
                    <RoomOutlined color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs className={classes.gridItem}>
                <Tooltip title="Clone Layer" aria-label="cloneLayer">
                  <IconButton>
                    <AddPhotoAlternateOutlined color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </ListItem>
        )
          : (
            <ListItem>
              <Grid container spacing={2} className={classes.inset}>
                <Grid item xs={12}>
                  <Skeleton animation={status === 'error' ? false : 'pulse'} className={classes.rectangle} variant="rect" height={21} />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <Skeleton animation={status === 'error' ? false : 'pulse'} className={classes.rectangle} variant="rect" height={20} />
                </Grid>
                <Grid item xs>
                  <Skeleton animation={status === 'error' ? false : 'pulse'} className={classes.circle} variant="circle" width={48} height={48} />
                </Grid>
                <Grid item xs>
                  <Skeleton animation={status === 'error' ? false : 'pulse'} className={classes.circle} variant="circle" width={48} height={48} />
                </Grid>
                <Grid item xs>
                  <Skeleton animation={status === 'error' ? false : 'pulse'} className={classes.circle} variant="circle" width={48} height={48} />
                </Grid>
                <Grid item xs>
                  <Skeleton animation={status === 'error' ? false : 'pulse'} className={classes.circle} variant="circle" width={48} height={48} />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </ListItem>
          )}
      </React.Fragment>
    )
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setJobOpacity: PropTypes.func.isRequired,
  setJobVisibility: PropTypes.func.isRequired,
  openExportDialog: PropTypes.func.isRequired,
  setActiveMapItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  productName: state.order.productName
})

const mapDispatchToProps = {
  setJobOpacity,
  setJobVisibility,
  openExportDialog,
  setActiveMapItem
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Job)
