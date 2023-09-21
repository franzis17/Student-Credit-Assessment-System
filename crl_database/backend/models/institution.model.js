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
      required: true,
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;
