import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
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
      required: false,
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
    unitsToAssess: [  // Array of Units, that was selected to be assessed
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
    curtinUnit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
    assessorNotes: {
      type: String,
      required: false,
    },
    studentNotes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
