import { Express } from "express";
import { DataSource } from "typeorm";
import { TodoModel } from "../../entities/todoModel";
import auth from "../../middleware/auth";
const readTodos = function (app: Express, connection: DataSource) {
  app.get("/routes/todo/read", auth, async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(TodoModel);
      const todo = await repository.find();
      return res.status(200).send(todo);
    } catch (e) {
      console.log("Error Reading Data.\n" + e);
    }
  });
};

export { readTodos };
