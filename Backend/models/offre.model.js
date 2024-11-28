const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OffreSchema = new Schema(
  {
    Client_id: {
      type: String,
      required: true,
    },
    Worker_id: {
      type: String,
      required: true,
      default: 0,
    },
    Client_location: {
      type: String,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const Offre = mongoose.model("Offre", OffreSchema);
module.exports = Offre;
