import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { IconButton, Snackbar } from "@material-ui/core";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../../services/AppConst";
import LocalStorageService from "../../services/LocalStorageService";
import LoadingDialog from "../../components/widget/LoadingDialog";
import {
  Alert,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/lab";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import useStyles from "./styles";

export default function Pricing() {
  const classes = useStyles();

  const [formKey, setFormKey] = useState(false);
  const [filterData, setFilterData] = useState({});

  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);

  // snackbar
  const [openSnackbar, handleSnackbar] = useState(false);
  const [snackbarSeverity, handleSnackbarSeverity] = useState("");
  const [snackbarMessage, handleSnackbarMessage] = useState("");

  const viewAttachment = async (id) => {
    //token
    const accessToken = LocalStorageService.getItem("accessToken");
    window.open(
      BACKEND_API_ENDPOINT + "tasks/download/" + id + `/${accessToken}`,
      "_blank"
    );
  };

  const getAllUserTasks = async () => {
    try {
      const accessToken = LocalStorageService.getItem("accessToken");
      var config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.get(BACKEND_API_ENDPOINT + "tasks", config).then((res) => {
        if (res.status === 200 && res.data) {
          // console.log(res.data)
          setAllTasks(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAlignment = async (v, tID) => {
    setLoading(true);
    const taskID = tID;
    const newValue = v;
    const accessToken = LocalStorageService.getItem("accessToken");
    var config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios
      .put(
        BACKEND_API_ENDPOINT + "tasks/" + taskID,
        {
          status: newValue,
        },
        config
      )
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          handleSnackbar(true);
          handleSnackbarSeverity("success");
          handleSnackbarMessage("Status Updated!");
          // setLoading(false);
          getAllUserTasks();
        } else {
          handleSnackbar(true);
          handleSnackbarSeverity("error");
          handleSnackbarMessage("Error Uploading Status!");
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        handleSnackbar(true);
        handleSnackbarSeverity("error");
        handleSnackbarMessage("Error!");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    // console.log(e)
    let temp = { ...filterData };
    temp[name] = value;
    setFilterData(temp);
    // console.log(documentInfo)
  };

  const resetFilter = () => {
    setLoading(true);
    setFilterData({});
    setFormKey(!formKey);
    getAllUserTasks();
  };

  const filterTasks = async () => {
    console.log(filterData);

    const accessToken = LocalStorageService.getItem("accessToken");
    var config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // endDate: "2022-11-30";
    // startDate: "2022-11-01";
    // status: "Todo";

    await axios
      .post(BACKEND_API_ENDPOINT + "tasks/filter", filterData, config)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setAllTasks(res.data);
          setLoading(false);
        } else if (res.data.length === 0) {
          handleSnackbar(true);
          handleSnackbarSeverity("error");
          handleSnackbarMessage("No data found!");
          setLoading(false);
        } else {
          handleSnackbar(true);
          handleSnackbarSeverity("error");
          handleSnackbarMessage("Error!");
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        handleSnackbar(true);
        handleSnackbarSeverity("error");
        handleSnackbarMessage("Error!");
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllUserTasks();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingDialog />
      ) : (
        <React.Fragment>
          <Container
            maxWidth="sm"
            component="main"
            className={classes.heroContent}
          >
            <Typography align="center" gutterBottom className={classes.title}>
              My Tasks
            </Typography>
          </Container>

          {/* Filter */}
          <Container
            maxWidth="sm"
            component="main"
            className={classes.heroContent}
            spacing={3}
          >
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12} spacing={3}>
                <ValidatorForm onSubmit={filterTasks} key={formKey}>
                  <Grid container spacing={3} mr={10}>
                      <Autocomplete
                        className="m-2 w-full"
                        style={{marginRight:10}}
                        label="Task Status"
                        options={["Todo", "Inprogress", "Done"]}
                        getOptionLabel={(opt) => opt}
                        size="small"
                        name="status"
                        onChange={(e, v) =>
                          handleChange({
                            target: {
                              name: "status",
                              value: v,
                            },
                          })
                        }
                        renderInput={(params) => (
                          <TextValidator
                            {...params}
                            variant="outlined"
                            label="Task Status"
                            helperText="Task Status"
                            value={filterData.status}
                          />
                        )}
                      />
                      <TextValidator
                        className="w-full m-2"
                        style={{marginRight:10}}
                        variant="outlined"
                        size="small"
                        helperText="Start Date"
                        onChange={handleChange}
                        value={filterData.startDate}
                        type="date"
                        name="startDate"
                      />
                      <TextValidator
                        className="w-full m-2"
                        style={{marginRight:10}}
                        variant="outlined"
                        size="small"
                        helperText="End Date"
                        onChange={handleChange}
                        value={filterData.endDate}
                        type="date"
                        name="endDate"
                      />
                      <Grid className={classes.test}>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="m-2"
                      >
                        Filter
                      </Button>
                      <Button
                        onClick={() => {
                          resetFilter();
                        }}
                        color="secondary"
                        variant="contained"
                        className="m-2"
                      >
                        Reset
                      </Button>
                      </Grid>
                    </Grid>
                </ValidatorForm>
              </Grid>
            </Grid>
          </Container>

          {/* Cards */}
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {allTasks && allTasks.length > 0 ? (
                allTasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardHeader
                        title={task.name}
                        subheader="Task"
                        titleTypographyProps={{ align: "center" }}
                        subheaderTypographyProps={{ align: "center" }}
                        className={classes.cardHeader}
                      />
                      <CardContent>
                        <div>
                          <Typography variant="h6" color="textPrimary">
                            {task.description}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="p" color="textSecondary">
                            Current Status: {task.status}
                          </Typography>
                        </div>
                        {task.filePath && (
                          <div>
                            Attachment:
                            <IconButton
                              color="primary"
                              aria-label="attached picture"
                              component="span"
                              onClick={() => viewAttachment(task._id)}
                            >
                              <InsertDriveFileIcon />
                            </IconButton>
                          </div>
                        )}
                        {/* toggle button */}
                        <div>
                          Change Status:
                          {/* Todo | Inprogress | Done */}
                          <ToggleButtonGroup
                            className="mt-2"
                            value={task.status}
                            exclusive
                            onChange={(e, v) => handleAlignment(v, task._id)}
                            aria-label="text alignment"
                          >
                            <ToggleButton
                              value="Todo"
                              aria-label="left aligned"
                            >
                              <FormatListBulletedIcon />
                            </ToggleButton>
                            <ToggleButton
                              value="Inprogress"
                              aria-label="centered"
                            >
                              <AutorenewIcon />
                            </ToggleButton>
                            <ToggleButton
                              value="Done"
                              aria-label="right aligned"
                            >
                              <PlaylistAddCheckIcon />
                            </ToggleButton>
                          </ToggleButtonGroup>
                          
                        </div>
                        {/* Date */}
                        <div style={{ textAlign: "right", marginTop: "15px" }}>
                          <Typography variant="p" color="textSecondary">
                            Date : {task.createdAt.split("T")[0]}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Container maxWidth="md" component="main">
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h6" color="textSecondary">
                        No Data Found!
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              )}
            </Grid>
          </Container>

          {openSnackbar && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2500}
              onClose={() => handleSnackbar(false)}
            >
              <Alert
                onClose={() => handleSnackbar(false)}
                severity={snackbarSeverity}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          )}
        </React.Fragment>
      )}
    </>
  );
}
