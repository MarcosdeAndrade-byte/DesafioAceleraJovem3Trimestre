// Classe Task
class Task {
  _id!: string;
  userId: string;
  title: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(
    userId: string,
    title: string,
    description: string,
    done: boolean,
    created_at: Date,
    updated_at: Date,
    _id: string
  ) {
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.done = done;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this._id = _id;
  }
}

export { Task };
