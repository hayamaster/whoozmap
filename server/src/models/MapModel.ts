import { Schema, model } from "mongoose";

const MapSchema = new Schema(
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
    },
    places: [
      {
        placeId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
        location: {
          type: String,
          default: "",
        },
        icon: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],

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

const MapModel = model("Map", MapSchema);

module.exports = MapModel;
