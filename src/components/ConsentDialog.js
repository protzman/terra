import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";

import { setUserConsent } from "../actions";

class ConsentDialog extends Component {
  handleAcceptConsent = () => {
    this.props.setUserConsent(true);
  };

  render() {
    const { consent } = this.props;
    return (
      <Dialog
        keepMounted
        open={!consent}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Welcome!</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This is a stripped down and early version of an application I led
            development on. It can no longer interact with the various APIs it
            used to due to no access to the public. You can still click around
            and see the idea for the most part. The work flow would be to place
            an order for satellite imagery on the left by choosing the
            variables, making a selction on the map, and placing the order.
            Orders would be fetched and displayed on the map, with the ability
            to edit the images opacity and some other variables in the right
            hand side drawer. Various mapping coordinate systems were
            implemented that can be toggled as well as the basemaps. A few had
            to be removed (a few of everything really,) but the idea is still
            there. This is also an early version before our typescript refactor
            due to the models representing infomation not part of the public
            domain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleAcceptConsent}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConsentDialog.propTypes = {
  consent: PropTypes.bool.isRequired,
  setUserConsent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  consent: state.app.consent,
});

const mapDispatchToProps = {
  setUserConsent,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));
export default enhance(ConsentDialog);
