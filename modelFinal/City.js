const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
    trim: true,
    required: true,
  },
  is_called_today: { type: Boolean, required: true },
  list: [
    {
      dt: { type: Number, required: true },
      temp: {
        type: Number,
        required: true,
      },
      feels_like: { type: Number, required: true },
      humidity: { type: Number, required: true },
      cloud_in_percentage: { type: Number, required: true },
      wind_speed: { type: Number, required: true },
      weather_id: { type: Number, required: true },
    },
  ],
  pollution_en: { type: String, required: true },
  pollution_kr: { type: String, required: true },
});

module.exports = mongoose.set("strictQuery", true).model("cities", CitySchema);
