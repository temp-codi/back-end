const mongoose = require("mongoose");

const CitiesSchema = new mongoose.Schema({
  city_name: {
    type: String,
    trim: true,
    required: true,
  },
  is_called_today: { type: Boolean, required: true },
});

module.exports = mongoose
  .set("strictQuery", true)
  .model("Cities", CitiesSchema);
