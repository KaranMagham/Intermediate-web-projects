import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: String, required: true, enum: ["high", "medium", "low"] }
}, { timestamps: true });

export const Notes = mongoose.model("Notes", noteSchema);
