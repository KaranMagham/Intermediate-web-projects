import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from "axios";
import { Weather } from './models/schema.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const api_key = process.env.API_KEY;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('🌦️ Weather App Backend is running!');
});

app.get('/api/weather', async (req, res) => {
  try {
    const data = await Weather.find().sort({ createdAt: -1 });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Data not fetched..." })
  }
});

app.post('/api/weather', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    res.status(400).json({ error: "City required..." })
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;
    console.log("API data:", data);

    const weatherEntry = new Weather({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    });

    const savedData = await weatherEntry.save();
    console.log("Saved to DB:", savedData);

    res.status(201).json({
      city: savedData.city,
      temp: savedData.temp,
      condition: savedData.condition,
      humidity: savedData.humidity,
      wind: savedData.wind,
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or save weather data" });
  }
});

app.delete('/api/weather/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deleted = await Weather.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Data not found to delete..." });
    }
    res.status(200).json({ message: "Data successfully deleted...", deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete data..." });
  }
});


app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
