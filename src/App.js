import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { theme } from "./utils/mui_theme";
import Olmap from "./components/map/Olmap";
import Authorizing from "./components/Authorizing";
import ConsentDialog from "./components/ConsentDialog";
import { authenticateUserRequest } from "./actions";

class App extends Component {
  componentDidMount() {
    // this.props.authenticateUserRequest()
  }

  render() {
    const { authorized, type } = this.props;
    return (
      <ThemeProvider theme={theme(type)}>
        <CssBaseline />
        {/* {authorized ? ( */}
        <React.Fragment>
          <Olmap />
          <ConsentDialog />
        </React.Fragment>
        {/* ) : <Authorizing />} */}
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  authorized: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  authenticateUserRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorized: state.app.authorized,
  type: state.app.theme,
});

const mapDispatchToProps = {
  authenticateUserRequest,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(App);
