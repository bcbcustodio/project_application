import {
  Button,
  Grid,
  TextField,
  Typography,
  withStyles,
  Container,
  Box,
  ListItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { SERVER_BASEURL } from "../config/config";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const CreateTodoForm = ({ classes }: { classes: any }) => {
  const navigate = useNavigate();
  const submit = async () => {
    const createTodoAPI = `${SERVER_BASEURL}/todo/create`;
    await Axios.post(createTodoAPI, {
      taskId: taskId,
      taskType: taskType,
      title: title,
      description: description,
      priority: priority,
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data.msg);
        console.log(e);
        console.log(e.response.data);
      });
  };
  const [taskId, setTaskId] = useState<number>(0);
  const [taskType, setTaskType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  return (
    <>
      <Stack
        style={{ padding: "1rem" }}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={6}
        maxHeight="lg"
        maxWidth="lg"
      >
        <Typography
          variant="h3"
          align="center"
          style={{ fontWeight: "bold", fontFamily: "Outfit" }}
        >
          CREATE A TASK
        </Typography>
        <ListItem>
          <Grid
            container
            direction={"row"}
            spacing={4}
            className={classes.root}
          >
            <Grid item xs={4}>
              <TextField
                className={classes.textFieldColor}
                fullWidth
                size="medium"
                color="primary"
                variant="filled"
                id="id"
                label="id"
                placeholder="0"
                type="number"
                onChange={(e) => setTaskId(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.textFieldColor}
                fullWidth
                size="medium"
                required
                variant="filled"
                id="taskType"
                label="TaskType"
                placeholder="Task"
                onChange={(e) => setTaskType(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className={classes.textFieldColor}
                fullWidth
                required
                size="medium"
                variant="filled"
                id="priority"
                label="Priority"
                placeholder="Priority"
                onChange={(e) => setPriority(e.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                className={classes.textFieldColor}
                fullWidth
                multiline
                size="medium"
                required
                variant="filled"
                id="title"
                label="Title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textFieldColor}
                fullWidth
                multiline
                size="medium"
                required
                variant="filled"
                id="description"
                label="Description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                size="large"
                color="primary"
                onClick={async () => {
                  await submit();
                }}
                variant="contained"
              >
                Create Task
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </Stack>
    </>
  );
};

const CustomCreateTodoForm = withStyles((theme: any) => ({
  textFieldColor: {
    backgroundColor: theme.palette.common.white,
  },
}))(CreateTodoForm);
export { CustomCreateTodoForm };
