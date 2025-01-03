const Booking = require("../models/Booking");

exports.bookSlot = async (req, res) => {
  try {
    const { date, time, guest, contact, name } = req.body;

    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking && existingBooking.booked) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked.",
      });
    }

    const booking = await Booking.findOneAndUpdate(
      { date, time },
      { date, name, time, guest, contact, booked: true },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Booking successful.",
      booking,
    });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

exports.getBookedSlots = async (req, res) => {
  try {
    let bookings = await Booking.find({ booked: true });
    bookings = bookings.reverse();
    res.status(200).json({
      message: "booking fetched successfully",
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await Booking.find({ booked: false }).select(
      "time date"
    );
    res.status(200).json({
      success: true,
      availableSlots,
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    booking.booked = false;
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
