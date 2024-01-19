import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

@Entity()
export class UserModel {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  favoriteColor: string;

  constructor(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    favoriteColor: string
  ) {
    this._id = new ObjectId();
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
    this.favoriteColor = favoriteColor;
  }
}
