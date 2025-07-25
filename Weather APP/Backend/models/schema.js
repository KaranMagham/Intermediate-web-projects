import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  condition: String,
  humidity: Number,
  wind: Number
}, { timestamps: true });


export const Weather = mongoose.model("Weather", weatherSchema);
