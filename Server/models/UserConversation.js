// models/UserConversation.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  text: { type: String, required: true }
}, { _id: false });

const UserConversationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });

const UserConversation = mongoose.model("UserConversation", UserConversationSchema);

export default UserConversation;
