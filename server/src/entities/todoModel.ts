import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class TodoModel {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  taskId: number;

  @Column()
  taskType: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  constructor(
    taskId: number,
    taskType: string,
    title: string,
    description: string,
    priority: string
  ) {
    this._id = new ObjectId();
    this.taskId = taskId;
    this.taskType = taskType;
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}
