import { DataSource } from "typeorm";
import { Express } from "express";
import { UserModel } from "../../entities/userModel";
import { ObjectId } from "mongodb";
import auth from "../../middleware/auth";

const _deleteUser = function (app: Express, connection: DataSource) {
  app.delete(`/routes/delete/:id`, auth, async (req, res) => {
    try {
      const id = req.params.id;
      const repository = (await connection).getMongoRepository(UserModel);
      const user = await repository.findOneAndDelete({ _id: new ObjectId(id) });
      return res.status(200).send(user);
    } catch (e) {
      console.log("Error Deleting Data.\n" + e);
    }
  });
};

export default _deleteUser;
