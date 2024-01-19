import { DataSource } from "typeorm";
import { Express } from "express";
import { UserModel } from "../../entities/userModel";
import { ObjectId } from "mongodb";
import auth from "../../middleware/auth";
const readUsers = function (app: Express, connection: DataSource) {
  app.get("/routes/read", auth, async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(UserModel);
      const user = await repository.find();
      return res.status(200).send(user);
    } catch (e) {
      console.log("Error Reading Data.\n" + e);
    }
  });
};

const readUser = function (app: Express, connection: DataSource) {
  app.get("/routes/read/:id", auth, async (req, res) => {
    try {
      const id = req.params.id;
      const repository = (await connection).getMongoRepository(UserModel);
      const user = await repository
        .findOne({
          where: {
            _id: new ObjectId(id),
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ msg: "Server ERROR " });
        });

      return res.status(200).send(user);
    } catch (e) {
      console.log("Error Reading Data.\n" + e);
    }
  });
};

const testr = () => {
  return 3;
};
export { testr, readUsers, readUser };
