import mongoose from "mongoose";

//create schema for database

const chatappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messagecontents", chatappSchema);

// const chatappSchema = mongoose.Schema({
//   name: String,
// });

// export default mongoose.model("rooms", chatappSchema);
