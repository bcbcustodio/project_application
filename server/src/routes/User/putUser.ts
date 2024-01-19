import { DataSource } from "typeorm";
import { Express, response } from "express";
import { UserModel } from "../../entities/userModel";
import { ObjectId } from "mongodb";
import auth from "../../middleware/auth";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface UpdateArgs {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  age?: number;
  password?: string;
  favoriteColor?: string;
}

interface PasswordValidation {
  currentPassword?: string;
  newPassword?: string;
}
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
  ? process.env.ACCESS_TOKEN_SECRET
  : "";
const updateUser = function (app: Express, connection: DataSource) {
  app.put("/routes/update/:id", auth, async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(UserModel);
   
      const id = req.params.id;
      let updateArgs: UpdateArgs = {};
      let passwordValidation: PasswordValidation = {};
      if (req.body.firstName) updateArgs.firstName = req.body.firstName;
      if (req.body.lastName) updateArgs.lastName = req.body.lastName;
      if (req.body.username) updateArgs.username = req.body.username;
      if (req.body.email) updateArgs.email = req.body.email;
      if (req.body.age) updateArgs.age = req.body.age;
      if (req.body.favoriteColor)
        updateArgs.favoriteColor = req.body.favoriteColor;

      if (req.body.newPassword) {
        console.log("here");
        passwordValidation.newPassword = req.body.newPassword;
        passwordValidation.currentPassword = req.body.currentPassword;
        await repository
          .findOne({
            where: {
              _id: new ObjectId(id),
            },
          })
          .then((response) => {
            if (passwordValidation.currentPassword && response !== null) {
              bcrypt.compare(
                passwordValidation.currentPassword,
                response.password,
                async (err, data) => {
                  if (data) {
                    updateArgs.password = await bcrypt.hash(
                      passwordValidation.newPassword!,
                      10
                    )!;
                    const updatedUser = await repository.findOneAndUpdate(
                      { _id: new ObjectId(id) },
                      { $set: updateArgs }
                    );

                    //JWT access token
                    const accessToken = jwt.sign(
                      { userData: updatedUser },
                      ACCESS_TOKEN_SECRET
                    );

                    return res
                      .cookie("token", accessToken, {
                        httpOnly: false,
                        maxAge: 365 * 24 * 60 * 60 * 1000,
                      })
                      .status(200)
                      .send(updatedUser);
                  }
                }
              );
            }
          })
          .catch((err) => {
            return res.status(500).json({ msg: "SERVER ERROR" });
          });
      } else {
        const updatedUser = await repository.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateArgs }
        );

        //JWT access token
        const accessToken = jwt.sign(
          { userData: updatedUser },
          ACCESS_TOKEN_SECRET
        );

        return res
          .cookie("token", accessToken, {
            httpOnly: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
          })
          .status(200)
          .send(updatedUser);
      }
    } catch (e) {
      console.log("Error Updating Data.\n" + e);
    }
  });
};

export { updateUser };
