import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    // MUST verify if the institution exists
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
    },
    status: {
      type: Number,
      required: false,
    },
    aqf: {
      type: Number,
    },
    location: {
      type: String,
    },
    award: {
      type: String,
    },
    assessor: {
      type: String,
      required: false,
    },
    previousUnit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
    curtinUnit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
