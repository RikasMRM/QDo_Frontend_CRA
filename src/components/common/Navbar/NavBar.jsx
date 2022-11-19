import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import LocalStorageService from "../../../services/LocalStorageService";
import { useHistory } from "react-router";
import { useAuth } from "../../../context/AuthContext";

import logo from "../../../assets/logo/logo-L.png";
import useStyles from "./styles";

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const { setAuth, user } = useAuth();

  const logout = () => {
    //logout user
    const accessToken = LocalStorageService.getItem("accessToken");
    if (accessToken) {
      LocalStorageService.removeItem("accessToken");
      history.push("/login");
      setAuth(false);
    } else {
      history.push("/login");
      setAuth(false);
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <img src={logo} height="50px" className={classes.image} alt="logo" />

          {user && user.name && (
            <Fragment>
              <nav className={classes.nav}>
                <Link
                  variant="button"
                  color="textPrimary"
                  href="task/new"
                  className={classes.link}
                >
                  Add New Task
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/"
                  className={classes.link}
                >
                  My Tasks
                </Link>
              </nav>
              <Button
                color="secondary"
                variant="outlined"
                className={classes.logout}
                onClick={logout}
              >
                Logout
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
