import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
  ListItem,
  Grid,
  Checkbox,
  FormControlLabel
} from '@material-ui/core'

import {
  closeExportDialog,
  exportImageRequest,
  setActiveJobRasterFilename,
  setActiveJobPolygonsFilename
} from '../actions'

import InputRow from './common/InputRow'

const styles = theme => ({
  helperText: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary
  },
  grid: {
    padding: theme.spacing(0, 2)
  },
  gridItem: {
    textAlign: 'center'
  }
})
class ExportDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raster: true,
      polygons: false
    }
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked })
  };

  handleClose = () => {
    this.props.closeExportDialog()
  }

  handleExport = () => {
    const { id, rasterFilename, polygonsFilename } = this.props.activeJob
    const { raster, polygons } = this.state
    this.props.exportImageRequest(id, raster ? rasterFilename : null, polygons ? polygonsFilename : null)
  }

  handleChangeRasterFilename = (event) => {
    this.props.setActiveJobRasterFilename(event.target.value)
  }

  handleChangePolygonsFilename = (event) => {
    this.props.setActiveJobPolygonsFilename(event.target.value)
  }

  render() {
    const { classes } = this.props
    const {
      id,
      job,
      rasterFilename,
      polygonsFilename
    } = this.props.activeJob
    const {
      raster,
      polygons
    } = this.state
    return (
      <Dialog
        keepMounted
        open={id !== null}
      >
        <DialogTitle>Export Image.</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Typography variant="body2">
                {`${id} is a ${job.operation} job. Select the options and filename below and press export to download the associated files.`}
              </Typography>
            </ListItem>
            <ListItem>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="caption">Select Files to Download</Typography>
                </Grid>
                <Grid item xs className={classes.gridItem}>
                  <FormControlLabel
                    value="raster"
                    label="Raster"
                    control={(
                      <Checkbox
                        color="primary"
                        value="raster"
                        checked={raster}
                        onChange={this.handleChange('raster')}
                      />
                  )}
                    labelPlacement="end"
                  />
                </Grid>

                <Grid item xs className={classes.gridItem}>
                  <FormControlLabel
                    value="polygons"
                    label="Polygons"
                    disabled={job.operation !== 'hlz'}
                    control={(
                      <Checkbox
                        color="primary"
                        value="polygons"
                        checked={polygons}
                        onChange={this.handleChange('polygons')}
                      />
                  )}
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <InputRow
                type="text"
                name="rasterFilename"
                label="Raster File Name"
                value={rasterFilename}
                handleChange={this.handleChangeRasterFilename}
              />
            </ListItem>
            <ListItem dense>
              <Typography variant="caption" className={classes.helperText}>
                * make sure to indicate a file extension, .tiff, .png are currently supported
              </Typography>
            </ListItem>
            {job.operation === 'hlz' && (
              <React.Fragment>
                <ListItem>
                  <InputRow
                    type="text"
                    name="polygonsFilename"
                    label="Polygons File Name"
                    endAdornment=".json"
                    adornmentType="string"
                    value={polygonsFilename}
                    handleChange={this.handleChangePolygonsFilename}
                    disabled={!polygons}
                  />
                </ListItem>
                <ListItem dense>
                  <Typography variant="caption" className={classes.helperText}>
                    * polygons can only be exported as json, no need to add the extension!
                  </Typography>
                </ListItem>
              </React.Fragment>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.handleExport}>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ExportDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  activeJob: PropTypes.object.isRequired,
  closeExportDialog: PropTypes.func.isRequired,
  exportImageRequest: PropTypes.func.isRequired,
  setActiveJobRasterFilename: PropTypes.func.isRequired,
  setActiveJobPolygonsFilename: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  activeJob: state.app.activeJob
})

const mapDispatchToProps = {
  closeExportDialog,
  exportImageRequest,
  setActiveJobRasterFilename,
  setActiveJobPolygonsFilename
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(ExportDialog)
