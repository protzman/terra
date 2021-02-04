import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Drawer,
  List,
  ListItem,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import {
  deleteJob
} from '../../actions'
import Job from '../Job'
import ExportDialog from '../ExportDialog'

const drawerWidth = 450

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

class MetadataDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      activeJob: {}
    }
  }

  handleDelete = (id, metadata) => {
    this.setState({
      modal: true,
      activeJob: {
        id,
        metadata
      }
    })
  }

  handleConfimDelete = () => {
    this.props.deleteJob(this.state.activeJob.id)
    this.handleClose()
  }

  handleClose = () => {
    this.setState({
      modal: false,
      activeJob: {}
    })
  }

  render() {
    const {
      open,
      classes,
      jobs,
      exportDialog
    } = this.props
    const {
      modal, activeJob
    } = this.state
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
            <Typography variant="overline">Submitted Jobs</Typography>
          </ListItem>
          {jobs.map(job => (
            <Job
              key={job.id}
              id={job.id}
              metadata={job.metadata}
              status={job.status}
              opacity={job.opacity}
              visibility={job.visibility}
              handleDelete={this.handleDelete}
            />
          ))}
        </List>
        <div className={classes.drawerSpacer} />
        {exportDialog && <ExportDialog />}
        <Dialog
          open={modal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete image ${activeJob.metadata && activeJob.metadata.productName}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Image id:${activeJob.id} is a ${activeJob.metadata && activeJob.metadata.operation} job. Deleting it will result in it being removed from the map. You will need to re-order the image if you wish to see the same results`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              abort
            </Button>
            <Button autoFocus color="primary" onClick={this.handleConfimDelete}>
              continue
            </Button>
          </DialogActions>
        </Dialog>
      </Drawer>
    )
  }
}

MetadataDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  deleteJob: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  hlzPolygons: state.hlz.hlzPolygons,
  activeJob: state.app.activeJob,
  exportDialog: state.app.exportDialog
})

const mapDispatchToProps = ({
  deleteJob
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(MetadataDrawer)
