import { Express } from "express";
import { DataSource } from "typeorm";
import { TodoModel } from "../../entities/todoModel";
import auth from "../../middleware/auth";
const createTodo = function (app: Express, connection: DataSource) {
  app.post("/routes/todo/create", auth, async (req, res) => {
    try {
      if (!req.body.taskId) {
        return res.status(400).send("Task ID not present in request.");
      }

      const newTodo = new TodoModel(
        req.body.taskId,
        req.body.taskType,
        req.body.title,
        req.body.description,
        req.body.priority
      );
      const repository = (await connection).getMongoRepository(TodoModel);

      const taskIdValidate = await repository.findOne({
        where: {
          taskId: req.body.taskId,
        },
      });

      if (taskIdValidate !== null) {
        console.log("Task ID is already Taken");
        return res.status(409).json({ msg: "Task ID is already Taken" });
      }
      const todo = await repository.insertOne(newTodo);

      return res.status(201).send(todo);
    } catch (e) {
      console.log("Error Creating Data.\n" + e);
    }
  });
};

export { createTodo };
