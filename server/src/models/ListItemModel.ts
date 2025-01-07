import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const ListItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    // postByUserId: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

const ListItemModel = mongoose.model("List", ListItemSchema);

module.exports = ListItemModel;
