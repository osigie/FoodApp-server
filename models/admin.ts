
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 2,
    maxlength: 20,
    trim: true,
  }, 
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 5,
  }
},
{ timestamps: true });


export default mongoose.model("Admin", AdminSchema);


