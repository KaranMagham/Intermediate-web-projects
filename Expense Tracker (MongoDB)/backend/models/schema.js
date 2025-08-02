import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    radio: { type: String, required: true },
    time: { type: Date, default: Date.now }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);
