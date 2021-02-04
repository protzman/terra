import React, { Component } from 'react'
import {
  Backdrop, CircularProgress, Typography, Grid
} from '@material-ui/core'

export default class Authorizing extends Component {
  render() {
    return (
      <React.Fragment>
        <Backdrop open>
          <Grid container direction="column" alignContent="center" alignItems="center">
            <Grid item>
              <CircularProgress color="inherit" size={60} />
            </Grid>
            <Grid item>
              <Typography variant="overline">
                authorizing with geoaxis..
              </Typography>
            </Grid>
          </Grid>
        </Backdrop>

      </React.Fragment>
    )
  }
}
