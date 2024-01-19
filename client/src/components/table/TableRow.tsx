import {
  Button,
  TableCell,
  TableRow,
  TextField,
  withStyles,
} from "@material-ui/core";
import { ObjectId } from "mongodb";
import { useState, SetStateAction, Dispatch } from "react";

import { SERVER_BASEURL } from "../config/config";
import Axios from "axios";
import React from "react";

interface TableRowDetails {
  _id: ObjectId;
  taskId: number;
  taskType: string;
  title: string;
  description: string;
  priority: string;
}
const CustomTableCell = withStyles((theme: any) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function CustomizedTableRow({
  rowInfo,
  taskList,
  setTaskList,
  readTasks,
  classes,
}: {
  rowInfo: TableRowDetails;
  taskList: TableRowDetails[];
  setTaskList: Dispatch<SetStateAction<TableRowDetails[]>>;
  readTasks: () => Promise<void>;
  classes?: any;
}) {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [rowTaskType, setRowTaskType] = useState<string>("");
  const [rowTitle, setRowTitle] = useState<string>("");
  const [rowDescription, setRowDescription] = useState<string>("");
  const [rowPriority, setRowPriority] = useState<string>("");

  const updateTask = async (id: string) => {
    const updateAPI = `${SERVER_BASEURL}/todo/update/${id}`;
    await Axios.put(updateAPI, {
      taskType: rowTaskType,
      title: rowTitle,
      description: rowDescription,
      priority: rowPriority,
    });
  };

  const deleteTask = async (id: string) => {
    const deleteAPI = `${SERVER_BASEURL}/todo/delete/${id}`;
    await Axios.delete(deleteAPI).catch((e) => {
      console.log(e);
      console.log(e.response.data);
    });
  };

  return (
    <>
      <TableRow className={classes.row} key={rowInfo.taskId}>
        <CustomTableCell width="5%" component="th" scope="row">
          {rowInfo.taskId}
        </CustomTableCell>
        {isButtonPressed ? (
          <>
            <CustomTableCell align="left" width="10%">
              <TextField
                id="taskType"
                label="TaskType"
                defaultValue={rowInfo.taskType}
                onChange={(e) => setRowTaskType(e.target.value)}
              />
            </CustomTableCell>
            <CustomTableCell align="left" width="20%">
              <TextField
                id="title"
                label="Title"
                fullWidth
                multiline
                defaultValue={rowInfo.title}
                onChange={(e) => setRowTitle(e.target.value)}
              />
            </CustomTableCell>
            <CustomTableCell align="left" width="35%">
              <TextField
                id="description"
                label="Desccription"
                fullWidth
                multiline
                defaultValue={rowInfo.description}
                onChange={(e) => setRowDescription(e.target.value)}
              />
            </CustomTableCell>
            <CustomTableCell align="left" width="10%">
              <TextField
                id="priority"
                label="Priority"
                fullWidth
                defaultValue={rowInfo.priority}
                onChange={(e) => setRowPriority(e.target.value)}
              />
            </CustomTableCell>
            <CustomTableCell align="center" width="20%">
              <Button
                size="small"
                color="primary"
                onClick={async () => {
                  await updateTask(rowInfo._id.toString());
                  await readTasks();
                  setIsButtonPressed(false);
                }}
                variant="contained"
              >
                Update
              </Button>{" "}
              <Button
                size="small"
                color="primary"
                onClick={async () => {
                  await deleteTask(rowInfo._id.toString());
                  setTaskList(taskList.filter((task) => task !== rowInfo));
                }}
                variant="contained"
              >
                Delete
              </Button>
            </CustomTableCell>
          </>
        ) : (
          <>
            <CustomTableCell align="left" width="10%">
              {rowInfo.taskType}
            </CustomTableCell>
            <CustomTableCell align="left" width="20%">
              {rowInfo.title}
            </CustomTableCell>
            <CustomTableCell align="left" width="35%">
              {rowInfo.description}
            </CustomTableCell>
            <CustomTableCell align="left" width="10%">
              {rowInfo.priority}
            </CustomTableCell>
            <CustomTableCell align="center" width="20%">
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setIsButtonPressed(true);
                }}
                variant="contained"
              >
                Edit
              </Button>
              {`\t`}
              <Button
                size="small"
                color="primary"
                onClick={async () => {
                  await deleteTask(rowInfo._id.toString());
                  setTaskList(taskList.filter((task) => task !== rowInfo));
                }}
                variant="contained"
              >
                Delete
              </Button>
            </CustomTableCell>
          </>
        )}
      </TableRow>
    </>
  );
}

export { CustomizedTableRow };
export type { TableRowDetails };
