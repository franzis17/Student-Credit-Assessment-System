import mongoose from "mongoose";

const Schema = mongoose.Schema;

const institutionSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      trim: true,
      required: true,
      minlength: 2,
    },
    rank: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Rank must be greater than 0.",
      },
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

export default Institution;
