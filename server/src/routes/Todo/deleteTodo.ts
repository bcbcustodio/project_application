import { DataSource } from "typeorm";
import { Express } from "express";
import { TodoModel } from "../../entities/todoModel";
import { ObjectId } from "mongodb";
import auth from "../../middleware/auth";

const _deleteTodo = function (app: Express, connection: DataSource) {
  app.delete(`/routes/todo/delete/:id`, auth, async (req, res) => {
    try {
      const id = req.params.id;
      const repository = (await connection).getMongoRepository(TodoModel);

      const todo = await repository
        .findOneAndDelete({
          _id: new ObjectId(id),
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ msg: "Bad Request" });
        });
      return res.status(200).send(todo);
    } catch (e) {
      console.log("Error Deleting Data.\n" + e);
    }
  });
};

export default _deleteTodo;
