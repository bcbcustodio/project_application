import config from "../config/config";
import { TodoModel } from "../entities/todoModel";
import { UserModel } from "../entities/userModel";
import { DataSource } from "typeorm";

const database: string = process.env.DB ? process.env.DB : config.db;

const entities = [UserModel, TodoModel];

const initDatabase = async () => {
  const connection = new DataSource({
    type: "mongodb",
    url: database,
    entities: entities,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await connection.initialize().then(() => {
    console.log("Database CONNECTED! ");
  });

  if (connection.isInitialized) {
    console.log("Running database");
  }
  return connection;
};

export default initDatabase;
