const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String, 
  },
  date: {
    type: String, 
  },
  time: {
    type: String, 
  },
  guest: {
    type: Number,
    min: 1,
  },
  contact: {
    type: String,
    minlength: 10,
  },
  booked: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
