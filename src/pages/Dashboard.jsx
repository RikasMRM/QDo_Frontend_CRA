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
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../services/AppConst";
import LocalStorageService from "../services/LocalStorageService";
import LoadingDialog from "../components/widget/LoadingDialog";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  tDescription: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  iconAttachment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

export default function Pricing() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);

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
        if (res.status == 200 && res.data) {
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
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Tasks
            </Typography>
          </Container>
          {allTasks && allTasks.length > 0 ? (
            allTasks.map((task) => (
              <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
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
                          <Typography variant="h6" color="textSecondary">
                            {task.status}
                          </Typography>
                        </div>
                        {task.filePath && (
                          <div className={classes.iconAttachment}>
                            <IconButton
                              color="primary"
                              aria-label="attached document"
                              component="span"
                              onClick={() => viewAttachment(task._id)}
                            >
                              <InsertDriveFileIcon />
                            </IconButton>
                          </div>
                        )}
                        <div style={{ textAlign: "right" }}>
                          <Typography variant="p" color="textSecondary">
                            Date : {task.createdAt.split("T")[0]}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
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
        </React.Fragment>
      )}
    </>
  );
}
