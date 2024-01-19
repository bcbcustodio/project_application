import { DataSource } from "typeorm";
import { Express } from "express";
import { ObjectId } from "mongodb";
import { TodoModel } from "../../entities/todoModel";
import auth from "../../middleware/auth";
interface UpdateTaskArgs {
  taskType?: string;
  title?: string;
  description?: string;
  priority?: string;
}

const updateTask = function (app: Express, connection: DataSource) {
  app.put("/routes/todo/update/:id", auth, async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(TodoModel);

      const id = req.params.id;
      let updateTaskArgs: UpdateTaskArgs = {};
      if (req.body.taskType) updateTaskArgs.taskType = req.body.fullName;
      if (req.body.title) updateTaskArgs.title = req.body.title;
      if (req.body.description)
        updateTaskArgs.description = req.body.description;
      if (req.body.priority) updateTaskArgs.priority = req.body.priority;

      const user = await repository
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateTaskArgs })
        .catch((err) => {
          console.log(err);
        });

      return res.status(200).send(user);
    } catch (e) {
      console.log("Error Updating Data.\n" + e);
    }
  });
};

export { updateTask };
