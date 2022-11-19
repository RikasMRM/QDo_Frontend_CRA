import { Button, Grid, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import LoadingDialog from "../components/widget/LoadingDialog";
import { BACKEND_API_ENDPOINT } from "../services/AppConst";
import LocalStorageService from "../services/LocalStorageService";

function AddTask() {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(false);

  // snackbar
  const [openSnackbar, handleSnackbar] = useState(false);
  const [snackbarSeverity, handleSnackbarSeverity] = useState("");
  const [snackbarMessage, handleSnackbarMessage] = useState("");

  //data
  const [taskInfo, setTaskInfo] = useState({});
  const [attachmentData, setAttachmentData] = useState([]);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    let temp = { ...taskInfo };
    temp[name] = value;
    setTaskInfo(temp);
  };

  const handleFormSubmit = async () => {
    var messageRes = null;
    var variantRes = null;
    var data = new FormData();

    data.append("attachment", attachmentData[0]);
    data.append("name", taskInfo.name);
    data.append("description", taskInfo.description);

    //token
    const accessToken = LocalStorageService.getItem("accessToken");
    var config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "multipart/form-data",
      },
    };

    await axios
      .post(BACKEND_API_ENDPOINT + "tasks", data, config)
      .then((res) => {
        if (res.status === 201) {
          messageRes = "Task Creation Success";
          variantRes = "success";
          handleSnackbar(true);
          handleSnackbarSeverity(variantRes);
          handleSnackbarMessage(messageRes);
          setTaskInfo({});
          setAttachmentData([]);
          setFormKey(!formKey);
          setLoading(false);
        } else {
          variantRes = "error";
          handleSnackbar(true);
          handleSnackbarSeverity(variantRes);
          handleSnackbarMessage("Error Uploading File!");
          setFormKey(!formKey);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        messageRes = error.message;
        variantRes = "error";
        handleSnackbar(true);
        handleSnackbarSeverity(variantRes);
        handleSnackbarMessage("Error:" + messageRes);
        setFormKey(!formKey);
        setLoading(false);
      });
  };

  const handleFileUpload = (event) => {
    event.persist();
    var files = [];
    if (event.target.files[0] !== undefined) {
      if (event.target.files.length < 2) {
        for (let j = 0; j < event.target.files.length; j++) {
          let file = event.target.files[j];
          if (file.size > 10000000) {
            handleSnackbar(true);
            handleSnackbarSeverity("error");
            handleSnackbarMessage("For each file size must be less than 10MB.");
            break;
          } else {
            files.push(file);
          }
        }
      } else {
        handleSnackbar(true);
        handleSnackbarSeverity("error");
        handleSnackbarMessage("Error: Can't Upload More Than 1 File.");
      }
    }

    setAttachmentData(files);
  };

  return (
    <div>
      {loading ? (
        <LoadingDialog />
      ) : (
        <div>
          <ValidatorForm onSubmit={() => handleFormSubmit()} key={formKey}>
            <Grid
              container
              alignContent="center"
              justifyContent="center"
              direction="column"
              className="mt-4"
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography className="m-4" variant="h5">
                  Add New Task
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="p-8 h-full bg-light-gray relative">
                  <TextValidator
                    className="mb-4 w-full"
                    variant="outlined"
                    size="small"
                    label="Task Name"
                    helperText="Task Name"
                    onChange={handleChange}
                    value={taskInfo.name}
                    type="text"
                    name="name"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />

                  <TextValidator
                    className="mb-4 w-full"
                    variant="outlined"
                    size="small"
                    label="Task Description"
                    helperText="Task Description"
                    onChange={handleChange}
                    value={taskInfo.description}
                    type="text"
                    multiline
                    rows={5}
                    name="description"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />

                  <TextValidator
                    className="mb-4 w-full"
                    variant="outlined"
                    size="small"
                    helperText="Please upload attachment"
                    onChange={handleFileUpload}
                    value={taskInfo.attachment}
                    type="file"
                    name="attachment"
                  />

                  <div className="text-right">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      type="submit"
                    >
                      Confirm Upload
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </ValidatorForm>

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
        </div>
      )}
    </div>
  );
}

export default AddTask;
