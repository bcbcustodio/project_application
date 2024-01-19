import { DataSource } from "typeorm";
import { Express } from "express";
import { createUser, login, logout } from "./postUser";
import { readUsers, readUser } from "./getUser";
import { updateUser } from "./putUser";
import _deleteUser from "./deleteUser";

const userRoutes = function (app: Express, connection: DataSource) {
  createUser(app, connection);
  readUsers(app, connection);
  updateUser(app, connection);
  _deleteUser(app, connection);
  readUser(app, connection);
  login(app, connection);
  logout(app, connection);
};

export default userRoutes;
