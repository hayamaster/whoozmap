import { Schema, model } from "mongoose";

const MapListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: [String],
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
      required: true,
    },
    postByUserName: {
      type: String,
      required: true,
    },
    postByUserId: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MapListModel = model("MapList", MapListSchema);

module.exports = MapListModel;
