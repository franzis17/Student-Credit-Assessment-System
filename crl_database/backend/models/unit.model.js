import mongoose from "mongoose";

const Schema = mongoose.Schema;

const unitSchema = new Schema(
  {
    unitCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    major: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    // MUST verify if the institution exists
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
      trim: true,
      minlength: 3,
    },
    status: {
      type: Number,
      required: false,
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

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;
