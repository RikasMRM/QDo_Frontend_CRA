import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  CircularProgress,
  Grid,
  Paper,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../../services/AppConst";
import LocalStorageService from "../../services/LocalStorageService";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/logo-L.png";
import useStyles from "./styles";

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
          if (res.status === 200 && res.data.success) {
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
    if (user) {
      history.push("/");
    }
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop={6}
    >
      <Paper className={classes.paper}>
      <img src={logo} className="App-logo" alt="logo" height="150px" />
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
          <Button
            disabled={loading}
            type="submit"
            className={classes.btn}
          >
            Sign in
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          <div>
            <Button
              className={classes.btnReg}
              onClick={() => {
                history.push("/register");
              }}
            >
              Register
            </Button>
          </div>
        </ValidatorForm>
      </Paper>
    </Grid>
  );
}
