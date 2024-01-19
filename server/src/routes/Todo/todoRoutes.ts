import { DataSource } from "typeorm";
import { Express } from "express";
import { createTodo } from "./postTodo";
import { readTodos } from "./getTodo";
import _deleteTodo from "./deleteTodo";
import { updateTask } from "./putTodo";

const todoRoutes = function (app: Express, connection: DataSource) {
  createTodo(app, connection);
  readTodos(app, connection);
  _deleteTodo(app, connection);
  updateTask(app, connection);
};

export default todoRoutes;
