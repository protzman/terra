import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from "@material-ui/core";
import {
  Code,
  ExitToApp,
  Settings,
  Straighten,
  AccessibilityNew,
} from "@material-ui/icons";

import { setTheme, setUnits } from "../../actions";
import { version } from "../../../package.json";

const styles = (theme) => ({
  menu: {
    marginTop: theme.spacing(11),
    width: 400,
  },
  disabled: {
    "&$disabled": {
      opacity: 1,
    },
  },
});

class AppMenu extends Component {
  handleToggleTheme = (checked) => {
    if (checked) {
      this.props.setTheme("dark");
    } else {
      this.props.setTheme("light");
    }
  };

  handleToggleUnits = (checked) => {
    if (checked) {
      this.props.setUnits("imperial");
    } else {
      this.props.setUnits("metric");
    }
  };

  render() {
    const {
      classes,
      anchorEl,
      handleClose,
      open,
      theme,
      units,
      user,
    } = this.props;
    return (
      <Menu
        id="field-type-menu"
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {user && (
          <MenuItem disabled>
            <ListItemText
              inset
              primary={user.uid}
              primaryTypographyProps={{ variant: "overline" }}
              secondary={user.mail}
            />
          </MenuItem>
        )}
        <MenuItem dense onClick={this.handleClose}>
          <ListItemIcon>
            <AccessibilityNew />
          </ListItemIcon>
          <ListItemText primary="Terra Walkthrough" />
        </MenuItem>
        <MenuItem dense onClick={this.handleClose}>
          <ListItemIcon>
            <Straighten />
          </ListItemIcon>
          <ListItemText primary="Metric / Imperial" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              color="secondary"
              checked={units === "imperial"}
              onChange={(e) => this.handleToggleUnits(e.target.checked)}
            />
          </ListItemSecondaryAction>
        </MenuItem>
        <MenuItem dense onClick={this.handleClose}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Light / Dark Theme" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={theme === "dark"}
              onChange={(e) => this.handleToggleTheme(e.target.checked)}
            />
          </ListItemSecondaryAction>
        </MenuItem>
        <MenuItem
          dense
          disabled
          classes={{ root: classes.disabled }}
          onClick={this.handleClose}
        >
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="API" />
        </MenuItem>
        <MenuItem dense onClick={this.handleClose}>
          <ListItemText inset primary="API Key" />
        </MenuItem>
        <MenuItem dense onClick={this.handleClose}>
          <ListItemText inset primary="API Documentation" />
        </MenuItem>
        <MenuItem disabled dense onClick={this.handleClose}>
          <ListItemText inset primary={`Version v.${version}`} />
        </MenuItem>
        <MenuItem dense onClick={this.handleClose}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    );
  }
}

AppMenu.defaultProps = {
  user: {},
  anchorEl: {},
};

AppMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  setUnits: PropTypes.func.isRequired,
  user: PropTypes.object,
  anchorEl: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.app.user,
  theme: state.app.theme,
  units: state.app.units,
});

const mapDispatchToProps = {
  setTheme,
  setUnits,
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(AppMenu);
