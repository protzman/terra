import React, { Component } from "react";
import { withStyles, fade } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
  LinearProgress,
} from "@material-ui/core";
import { Add, Landscape, MoreVert, Search } from "@material-ui/icons";

import OrderDrawer from "./orderDrawer/OrderDrawer";
import MetadataDrawer from "./metadataDrawer/MetadataDrawer";
import AppMenu from "./menus/AppMenu";
import {
  setLeftDrawerOpen,
  setRightDrawerOpen,
  setResultsDrawerOpen,
  fetchSearchResultsRequest,
} from "../actions";
import ResultsDrawer from "./resultsDrawer/ResultsDrawer";
import Banner from "./common/Banner";
import ObstructionDrawer from "./ObstructionDrawer";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 2),
  },
  spacer: {
    flexGrow: 1,
  },
  search: {
    left: 0,
    right: 0,
    position: "relative",
    color: theme.palette.text.disabled,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.background.default, 0.55),
    "&:hover": {
      backgroundColor: fade(theme.palette.background.default, 0.65),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    // display: 'inline-flex',
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 220,
      "&:focus": {
        width: 300,
      },
    },
  },
  drawerIcon: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.longest,
    }),
  },
  drawerIconOpen: {
    transform: "rotate(135deg)",
  },
  appbar: {
    background: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer + 1,
    marginTop: 24,
    height: 66,
  },
  progress: {
    zIndex: theme.zIndex.drawer + 2,
  },
  progressHidden: {
    visibility: "hidden",
  },
});

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      searchText: "",
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
      anchorEl: null,
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  handleSearch = () => {
    const { searchText } = this.state;
    if (searchText !== "") {
      this.props.fetchSearchResultsRequest(searchText);
    }
  };

  render() {
    const {
      classes,
      loading,
      left,
      right,
      results,
      obstruction,
      images,
      searchResults,
      activeDvofItem,
      ...other
    } = this.props;
    const { anchorEl, searchText } = this.state;
    return (
      <div className={classes.root}>
        <Banner position="top" />
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Landscape color="primary" className={classes.button} />
            <Typography variant="h6" className={classes.button}>
              T E R R A
            </Typography>
            <Button
              className={classes.button}
              startIcon={
                <Add
                  className={clsx(classes.drawerIcon, {
                    [classes.drawerIconOpen]: left,
                  })}
                />
              }
              onClick={() => this.props.setLeftDrawerOpen(!left)}
            >
              new order
            </Button>
            <div className={classes.spacer} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="search locations..."
                classes={{ input: classes.inputInput }}
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={(e) => this.onChange(e)}
                onKeyUp={this.handleSearch}
              />
            </div>
            <Button
              className={classes.button}
              disabled={images.length < 1}
              endIcon={
                <Add
                  className={clsx(classes.drawerIcon, {
                    [classes.drawerIconOpen]: right,
                  })}
                />
              }
              onClick={() => this.props.setRightDrawerOpen(!right)}
            >
              orders
            </Button>
            <Button
              className={classes.button}
              disabled={searchResults.length < 1}
              endIcon={
                <Add
                  className={clsx(classes.drawerIcon, {
                    [classes.drawerIconOpen]: results,
                  })}
                />
              }
              onClick={() => this.props.setResultsDrawerOpen(!results)}
            >
              search results
            </Button>
            <IconButton className={classes.button} onClick={this.handleClick}>
              <MoreVert />
            </IconButton>
          </Toolbar>
          <LinearProgress
            className={clsx(classes.progress, {
              [classes.progressHidden]: !loading,
            })}
          />
        </AppBar>
        <AppMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleClose={this.handleClose}
        />
        <OrderDrawer
          open={left}
          addInteraction={this.props.addInteraction}
          {...other}
        />
        <MetadataDrawer open={right} />
        <ResultsDrawer open={results} />
        <ObstructionDrawer open={obstruction} activeDvofItem={activeDvofItem} />
      </div>
    );
  }
}

Appbar.defaultProps = {
  searchResults: [],
  activeDvofItem: {},
};

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
  left: PropTypes.bool.isRequired,
  right: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  results: PropTypes.bool.isRequired,
  obstruction: PropTypes.bool.isRequired,
  searchResults: PropTypes.array,
  activeDvofItem: PropTypes.object,
  setLeftDrawerOpen: PropTypes.func.isRequired,
  setRightDrawerOpen: PropTypes.func.isRequired,
  addInteraction: PropTypes.func.isRequired,
  setResultsDrawerOpen: PropTypes.func.isRequired,
  fetchSearchResultsRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  left: state.app.left,
  right: state.app.right,
  results: state.app.results,
  obstruction: state.app.obstruction,
  images: state.job.jobs,
  searchResults: state.search.results,
  activeDvofItem: state.app.activeDvofItem,
});

const mapDispatchToProps = {
  setLeftDrawerOpen,
  setRightDrawerOpen,
  setResultsDrawerOpen,
  fetchSearchResultsRequest,
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Appbar);
