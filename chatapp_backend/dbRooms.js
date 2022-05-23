import mongoose from "mongoose";

//create schema for database
const roomSchema = mongoose.Schema({
  name: String,
});
export default mongoose.model("rooms", roomSchema);
