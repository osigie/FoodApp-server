import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: 100,
    },
    street: {
      type: String,
      required: [true, "Please provide street"],
      maxlength: 500,
    },
    postal: {
      type: String,
    },
    city: {
      type: String,
    },
    orders: { type: Array, default: [] },
    admin: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
