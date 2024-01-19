import { DataSource } from "typeorm";
import { Express } from "express";
import { UserModel } from "../../entities/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import auth from "../../middleware/auth";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
  ? process.env.ACCESS_TOKEN_SECRET
  : "";
const createUser = function (app: Express, connection: DataSource) {
  app.post("/routes/create", auth, async (req, res) => {
    try {
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send("Incomplete Details for user creation");
      }

      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = new UserModel(
        req.body.username,
        password,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.age,
        req.body.favoriteColor
      );
      const repository = (await connection).getMongoRepository(UserModel);
      const user = await repository.insertOne(newUser);

      return res.status(201).send(user);
    } catch (e) {
      console.log("Error Creating Data.\n" + e);
    }
  });
};

const login = function (app: Express, connection: DataSource) {
  app.post("/routes/login", async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(UserModel);
      const username = req.body.username;
      const reqPassword = req.body.password;

      const user = await repository.findOne({
        where: {
          $or: [
            {
              username: username,
            },
            { email: username },
          ],
        },
      });

      if (!user) return res.status(400).json({ msg: "User does not exist" });

      bcrypt.compare(reqPassword, user.password, (err, data) => {
        if (err) throw err;

        //deconstruct object and remove password
        const { password, ...newUser } = user;

        //JWT access token
        const accessToken = jwt.sign(
          { userData: newUser },
          ACCESS_TOKEN_SECRET
        );
        if (data) {
          res.cookie("token", accessToken, {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
          });
          res.cookie("userId", newUser._id.toString(), {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
          });
          return res.status(200).send({ newUser, accessToken });
        } else {
          return res.status(401).json({ msg: "Invalid credencial" });
        }
      });
    } catch (e) {
      console.log("Error Reading Data.\n" + e);
    }
  });
};

const logout = function (app: Express, connection: DataSource) {
  app.post("/routes/logout", async (req, res) => {
    try {
      res.cookie("userId", "", {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });
      return res
        .cookie("token", "", {
          maxAge: 365 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .send({ msg: "Logout Successful" });
    } catch (e) {
      console.log("Error Reading Data.\n" + e);
    }
  });
};

export { createUser, login, logout };
