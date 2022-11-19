import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Grid, Paper, Snackbar } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../../services/AppConst";
import { Alert } from "@material-ui/lab";

import logo from "../../assets/logo/logo-L.png";
import useStyles from "./styles";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState();

  const classes = useStyles();
  const history = useHistory();

  // snackbar
  const [openSnackbar, handleSnackbar] = useState(false);
  const [snackbarSeverity, handleSnackbarSeverity] = useState("");
  const [snackbarMessage, handleSnackbarMessage] = useState("");

  const handleFormSubmit = async () => {
    try {
      await axios
        .post(BACKEND_API_ENDPOINT + "users/register", {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        })
        .then((res) => {
          if (res.status === 201) {
            handleSnackbar(true);
            handleSnackbarSeverity("success");
            handleSnackbarMessage(
              "User registered successfully! Please login to continue."
            );
            setTimeout(() => {
              history.push("/login");
            }, 1500);
          } else {
            setMessage("Error.Registration Failed.Please try again later.");
            setLoading(false);
            handleSnackbar(true);
            handleSnackbarSeverity("error");
            handleSnackbarMessage(res.data.message);
          }
        });
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setLoading(false);
      handleSnackbar(true);
      handleSnackbarSeverity("error");
      handleSnackbarMessage("Error!");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop={6}
    >
      <Paper className={classes.paper}>
        <img src={logo} className="App-logo" alt="logo" height="100px" />
        <Typography variant="h5" className={classes.titleText}>
          LOGIN
        </Typography>
        <ValidatorForm className="mt-4" onSubmit={handleFormSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextValidator
                className="mt-4 w-full"
                variant="outlined"
                size="small"
                label="Name"
                onChange={handleChange}
                type="text"
                name="name"
                value={userInfo.name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                className="mt-4 w-full"
                variant="outlined"
                size="small"
                label="Email"
                onChange={handleChange}
                type="email"
                name="email"
                value={userInfo.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "this field is required",
                  "Please enter valid email",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                className="mt-4 w-full"
                label="Password"
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="password"
                type="password"
                value={userInfo.password}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12} md={12} sm={12} className="mt-4">
              {message && <p style={{ color: "red" }}>{message}</p>}
            </Grid>
          </Grid>
          <Button disabled={loading} type="submit" className={classes.btn}>
            Register
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          <div>
            <Button
              className={classes.btnReg}
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          </div>
          {openSnackbar && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2500}
              onClose={() => handleSnackbar(false)}
            >
              <Alert
                severity={snackbarSeverity}
                onClose={() => handleSnackbar(false)}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          )}
        </ValidatorForm>
      </Paper>
    </Grid>
  );
}
