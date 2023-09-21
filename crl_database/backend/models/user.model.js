import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Roles of all users
const validRoles = ["admin", "unit coordinator", "staff"];
const defaultRole = "staff";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: validRoles,
      default: defaultRole,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
