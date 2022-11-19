import { Button, Typography, Grid } from "@material-ui/core";
import React, { Component } from "react";
// import logo from "../../../assets/404.png";
import logo from "../../../assets/logo/logo-L.png";
// import useStyles from "./styles";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <img src={logo} className="App-logo" alt="logo" height="300px" />
            <Typography variant="h3" className="my-3" style={{ marginTop: "20px" }}>
              Page Not Found 404
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className="my-3"
              variant="contained"
              color="primary"
              style={{ marginTop: "30px" }}
              onClick={this.redirectToHome}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NotFound;
