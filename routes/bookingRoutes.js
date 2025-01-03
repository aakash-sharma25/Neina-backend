const express = require("express");
const {
  bookSlot,
  getBookedSlots,
  deleteBooking,
  getAvailableSlots,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getBookedSlots);
router.post("/", bookSlot);
router.delete("/:id", deleteBooking);
router.get("/availability", getAvailableSlots);

module.exports = router;
