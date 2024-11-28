const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // Reference to the Client model
    required: true,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker", // Reference to the Worker model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String, // e.g., "Pending", "Confirmed", "Cancelled", etc.
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  message: {
    type: String, // Optional message from the client
    required: false,
  },
  price: {
    type: Number, // Price for the service
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
