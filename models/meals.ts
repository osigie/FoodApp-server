import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MealsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of meals"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 200,
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
      default: 1,
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meals", MealsSchema);
