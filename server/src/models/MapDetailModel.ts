import { Schema, model } from "mongoose";

const MapDetailSchema = new Schema(
  {
    mapId: {
      type: Schema.ObjectId,
      required: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MapDetailModel = model("MapDetail", MapDetailSchema);

module.exports = MapDetailModel;
