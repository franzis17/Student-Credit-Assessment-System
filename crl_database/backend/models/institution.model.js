import mongoose from "mongoose";

const Schema = mongoose.Schema;

const institutionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
    },
    rank: {
      type: Number,
      required: false,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    major: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
