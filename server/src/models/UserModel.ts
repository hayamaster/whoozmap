import { Schema, model } from "mongoose";

const userModelSchema = new Schema(
  {
    userName: {
      type: String,
      require: [true, "provide a name"],
    },
    email: {
      type: String,
      required: [true, "provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userModelSchema);

module.exports = UserModel;
