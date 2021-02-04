import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Collapse,
  Typography,
} from "@material-ui/core";
import { Warning, Add } from "@material-ui/icons";
import faker from "faker";

import InputRow from "../common/InputRow";
import Options from "./options/Options";
import {
  setOrderOperation,
  setOrderDatasource,
  setProductName,
  postHlzTaskRequest,
  postHillshadeTaskRequest,
  postViewshedTaskRequest,
} from "../../actions";
import Viewshed from "./advancedOptions/Viewshed";
import Hillshade from "./advancedOptions/Hillshade";
import Hlz from "./advancedOptions/Hlz";

const drawerWidth = 450;

const styles = (theme) => ({
  root: {
    position: "inherit !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    border: "none",
    width: drawerWidth,
  },
  drawerSpacer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  textField: {
    borderRadius: theme.shape.borderRadius,
  },
  submit: {
    width: drawerWidth,
    padding: theme.spacing(2),
  },
  bottomButton: {
    height: theme.spacing(7),
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
});

const operations = [
  {
    name: "viewshed",
    label: "Viewshed",
    value: "viewshed",
    disabled: true,
  },
  {
    name: "hillshade",
    label: "Hillshade",
    value: "hillshade",
    disabled: false,
  },
  {
    name: "hlz",
    label: "HLZ",
    value: "hlz",
    disabled: false,
  },
];

const datasources = [
  {
    name: "data_type_0",
    label: "DATA TYPE 0",
    value: "data_type_0",
    disabled: false,
  },
  {
    name: "data_type_1",
    label: "DATA TYPE 1",
    value: "data_type_1",
    disabled: false,
  },
  {
    name: "data_type_2",
    label: "DATA TYPE 2",
    value: "data_type_2",
    disabled: false,
  },
  {
    name: "data_type_3",
    label: "DATA TYPE 3",
    value: "data_type_3",
    disabled: false,
  },
  {
    name: "data_type_4",
    label: "DATA TYPE 4",
    value: "data_type_4",
    disabled: false,
  },
];

class OrderDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsExpanded: true,
      advancedOptionsExpanded: false,
    };
  }

  getProductNamePlaceholder() {
    const { productName, operation } = this.props;
    if (productName) return productName;
    if (operation) {
      const newProductName = `${operation}-${faker.random
        .uuid()
        .substr(0, 10)}`;
      this.props.setProductName(newProductName);
    }
  }

  handleChangeOperation = (event) => {
    this.props.setOrderOperation(event.target.value);
  };

  handleChangeOperation = (event) => {
    this.props.setOrderOperation(event.target.value);
  };

  handleChangeDatasource = (event) => {
    this.props.setOrderDatasource(event.target.value);
    this.getProductNamePlaceholder();
  };

  handleChangeProductName = (event) => {
    this.props.setProductName(event.target.value);
  };

  toggleExpand = (collapsable) => {
    this.setState((prevState) => ({
      [collapsable]: !prevState[collapsable],
    }));
  };

  submitOrder = () => {
    const { order, taskSelector } = this.props;

    // flip from lon lat to lat lon
    let bbox;
    if (order.feature === "boundingBox") {
      const bl = order.bottomLeftCoordinate.split(",");
      const tr = order.topRightCoordinate.split(",");
      bbox = [
        parseFloat(bl[1]),
        parseFloat(bl[0]),
        parseFloat(tr[1]),
        parseFloat(tr[0]),
      ];
    }
    let point;
    if (order.feature === "circle") {
      const coordinates = order.circleCoordinate.split(",");
      point = [parseFloat(coordinates[1]), parseFloat(coordinates[0])];
    }

    const submission = {
      bbox: bbox || null,
      point: point || null,
      ...order,
      ...taskSelector,
    };

    switch (order.operation) {
      case "hillshade":
        this.props.postHillshadeTaskRequest(submission);
        break;
      case "viewshed":
        this.props.postViewshedTaskRequest(submission);
        break;
      case "hlz":
        this.props.postHlzTaskRequest(submission);
        break;
      default:
        console.log(`error posting order`);
    }
  };

  render() {
    const { open, classes, datasource, operation, productName } = this.props;
    const { optionsExpanded, advancedOptionsExpanded } = this.state;

    let advancedOptions;
    switch (operation) {
      case "hillshade":
        advancedOptions = <Hillshade />;
        break;
      case "viewshed":
        advancedOptions = <Viewshed />;
        break;
      case "hlz":
        advancedOptions = <Hlz />;
        break;
      default:
        advancedOptions = (
          <ListItem>
            <ListItemIcon>
              <Warning />
            </ListItemIcon>
            <ListItemText primary="error with operation selection." />
          </ListItem>
        );
    }

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerSpacer} />
        <List>
          <ListItem>
            <Typography variant="overline">Create New Order</Typography>
          </ListItem>
          <React.Fragment>
            <ListItem>
              <InputRow
                type="select"
                label="Operations"
                name="operation"
                options={operations}
                value={operation}
                selected={operation}
                handleChange={this.handleChangeOperation}
              />
            </ListItem>
            <ListItem>
              <InputRow
                type="select"
                label="Datasource"
                name="datasource"
                options={datasources}
                value={datasource}
                selected={datasource}
                handleChange={this.handleChangeDatasource}
              />
            </ListItem>
            <ListItem>
              <InputRow
                type="text"
                label={
                  operation && !productName
                    ? `${operation}-${faker.random.uuid().substr(0, 10)}`
                    : "Product Name"
                }
                name="productName"
                value={productName}
                handleChange={this.handleChangeProductName}
              />
            </ListItem>
          </React.Fragment>

          {operation !== "" && datasource !== "" && (
            <Options
              disabled={datasource === ""}
              expanded={optionsExpanded}
              addInteraction={this.props.addInteraction}
              onClick={() => this.toggleExpand("optionsExpanded")}
            />
          )}

          {operation !== "" && datasource !== "" && (
            <React.Fragment>
              <ListItem>
                <Typography variant="overline">{`Advanced ${operation} Options`}</Typography>
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => this.toggleExpand("advancedOptionsExpanded")}
                  >
                    <Add
                      className={clsx(classes.drawerIcon, {
                        [classes.drawerIconOpen]: advancedOptionsExpanded,
                      })}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse unmountOnExit in={advancedOptionsExpanded}>
                {advancedOptions}
              </Collapse>
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Button fullWidth className={classes.bottomButton}>
                      reset
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button
                      fullWidth
                      className={classes.bottomButton}
                      onClick={this.submitOrder}
                    >
                      create
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </React.Fragment>
          )}
        </List>
        <div className={classes.drawerSpacer} />
      </Drawer>
    );
  }
}

OrderDrawer.defaultProps = {
  taskSelector: {},
};

OrderDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  taskSelector: PropTypes.object,
  datasource: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  setOrderOperation: PropTypes.func.isRequired,
  setOrderDatasource: PropTypes.func.isRequired,
  setProductName: PropTypes.func.isRequired,
  postHlzTaskRequest: PropTypes.func.isRequired,
  postHillshadeTaskRequest: PropTypes.func.isRequired,
  postViewshedTaskRequest: PropTypes.func.isRequired,
  addInteraction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  operation: state.order.operation,
  datasource: state.order.datasource,
  productName: state.order.productName,
  order: state.order,
  taskSelector: state[state.order.operation],
});

const mapDispatchToProps = {
  setOrderOperation,
  setOrderDatasource,
  setProductName,
  postHlzTaskRequest,
  postHillshadeTaskRequest,
  postViewshedTaskRequest,
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(OrderDrawer);
