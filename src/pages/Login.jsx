import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../services/AppConst";
import LocalStorageService from "../services/LocalStorageService";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/logo-L.png";
import "./styles.css"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState();

  const classes = useStyles();
  const history = useHistory();
  const { setAuth, user } = useAuth();

  const handleFormSubmit = async () => {
    try {
      await axios
        .post(BACKEND_API_ENDPOINT + "users/login", {
          email: userInfo.email,
          password: userInfo.password,
        })
        .then((res) => {
          if (res.status == 200 && res.data.success) {
            LocalStorageService.setItem("accessToken", res.data.token);
            setAuth(true);
            history.push("/");
          } else {
            setMessage("Invalid Credentials. Login Failed!");
            setLoading(false);
          }
        });
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setLoading(false);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };

  useEffect(() => {
    if(user){
      history.push('/')
    }
  },)
  

  return (
    <ValidatorForm className="mt-4" onSubmit={handleFormSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <img src={logo} className="App-logo" alt="logo"  height="100px"/>
        <Typography component="h1" variant="h5">
          User Login
        </Typography>
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
            className="mt-3 w-full"
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
            Sign in
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <div className="mt-4">
          <Button
            onClick={() => {
              history.push("/register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </ValidatorForm>
  );
}
