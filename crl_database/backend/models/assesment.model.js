import mongoose from "mongoose";

const Schema = mongoose.Schema;

const assessmentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    // the assessment status, 1 is deny, 2 is approve
    status: {
      type: Number,
      required: true,
    },
    // the assessor of the unit
    assessor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // the unit the assessor assess
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
    
    date: {
      type: Date
    },

    studentNotes: {
      type: String,
    },

    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },

    noteLog: [  
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
