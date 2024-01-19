import Axios from "axios";
import { useState, useEffect } from "react";
import { SERVER_BASEURL } from "../config/config";

import React from "react";
import PropTypes from "prop-types";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import { CustomizedTableRow, TableRowDetails } from "./TableRow";
import { Stack } from "@mui/material";
import Cookies from "js-cookie";

const CustomTableCell = withStyles((theme: any) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles: any = (theme: any) => ({
  root: {
    width: "70vw",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: "100%",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function CustomizedTable(props: any) {
  const { classes } = props;

  const [taskList, setTaskList] = useState<TableRowDetails[]>([]);

  const readTasks = async (): Promise<void> => {
    const readTodoAPI = `${SERVER_BASEURL}/todo/read`;
    Axios.get(readTodoAPI, {
      withCredentials: true,
    })
      .then((response) => {
        setTaskList(Array.from(response.data));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
      });
  };

  useEffect(() => {
    readTasks();
  }, []);

  return (
    <>
      <Stack
        style={{ padding: "1rem" }}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={6}
        maxHeight="lg"
        maxWidth="lg"
      >
        <Typography
          variant="h3"
          align="center"
          style={{ fontWeight: "bold", fontFamily: "Outfit" }}
        >
          TASK LIST
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>ID</CustomTableCell>
                <CustomTableCell align="left">TaskType</CustomTableCell>
                <CustomTableCell align="left">Title</CustomTableCell>
                <CustomTableCell align="left">description</CustomTableCell>
                <CustomTableCell align="left">priority</CustomTableCell>
                <CustomTableCell align="center">Actions</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList.map((rowInfo: TableRowDetails) => (
                <CustomizedTableRow
                  rowInfo={rowInfo}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  readTasks={readTasks}
                  classes={classes}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CustomTable = withStyles(styles)(CustomizedTable);
export default CustomTable;
