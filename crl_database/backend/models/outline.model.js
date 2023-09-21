import mongoose from "mongoose";

const Schema = mongoose.Schema;

const outlineSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true,
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
    },
  },
  {
    timestamps: true,
  }
);

const Outline = mongoose.model("Outline", outlineSchema);

export default Outline;
