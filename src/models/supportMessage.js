import mongoose from "mongoose";

const supportMessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    status: { type: String, enum: ["pending", "answered"], default: "pending" },
  },
  { timestamps: true }
);

export default supportMessageSchema;
