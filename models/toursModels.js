const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama tour harus ada"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    require: [true, "Harganya harus ada"],
  },
})

const Tour = mongoose.model("Tour", tourSchema)

// testTour.save()

module.exports = Tour
