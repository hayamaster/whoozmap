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
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allows for unique constraint on googleId while allowing null values,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("User", userModelSchema);

module.exports = UserModel;
