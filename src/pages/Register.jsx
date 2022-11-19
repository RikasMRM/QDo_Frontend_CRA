import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid, Snackbar } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../services/AppConst";
import { Alert } from "@material-ui/lab";
import logo from "../assets/logo/logo-L.png";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
}));

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
          if (res.status == 201) {
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
    <ValidatorForm className="mt-4" onSubmit={handleFormSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <img src={logo} height="50px" className="App-logo" alt="logo" />
        <Typography component="h1" variant="h5">
          Register User
        </Typography>
        <Grid item xs={12} sm={12} md={12}>
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
        <Grid item xs={12} sm={12} md={12}>
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
        <Grid item xs={12} md={12} sm={12}>
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

      <div className="flex flex-wrap text-center mt-4">
        <div className="relative">
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            type="submit"
          >
            Register
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <div className="mt-4">
          <Button
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
      </div>
    </ValidatorForm>
  );
}
