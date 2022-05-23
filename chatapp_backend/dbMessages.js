import mongoose from "mongoose";

//create schema for database
const chatappSchema = mongoose.Schema({
  message: String,
  roomId: String,
  name: String,
  email: String,
  timestamp: String,
  // roomID: Array,
  // sender: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  //  timestamps: true,
});
export default mongoose.model("messagecontents", chatappSchema);
