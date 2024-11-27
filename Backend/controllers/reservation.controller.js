const Reservation = require('../models/reservation.model');
const mongoose = require('mongoose');
// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { client, worker, date, price, message } = req.body;

    const newReservation = new Reservation({
      client,
      worker,
      date,
      price,
      message
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('client', 'firstname lastname email')
      .populate('worker', 'firstname lastname speciality');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id)
      .populate('client', 'firstname lastname email')
      .populate('worker', 'firstname lastname speciality');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reservation by ID
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    )
      .populate('client', 'firstname lastname email')
      .populate('worker', 'firstname lastname speciality');

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMonthlyRevenueByWorker = async (req, res) => {
  try {
    const { workerId } = req.params; // Get the worker ID from request parameters
    const { year } = req.query; // Get year from query parameters or use current year

    const currentYear = year ? parseInt(year, 10) : new Date().getFullYear();

    // Fetch all reservations for the given worker and year
    const reservations = await Reservation.find({
      worker: workerId,
      date: {
        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
      },
    });
    console.log(reservations);
    // Initialize an array to hold revenue for all  months
    const monthlyRevenue = Array(12).fill(0);

    // Sum up revenue for each month
    reservations.forEach((reservation) => {
      const month = new Date(reservation.date).getMonth(); // Get month (0-11)
      monthlyRevenue[month] += reservation.price; // Add price to the corresponding month
    });
    console.log(monthlyRevenue);
    // Format the response
    const formattedRevenue = monthlyRevenue.map((revenue, index) => ({
      month: new Date(2000, index).toLocaleString("en-US", { month: "long" }),
      totalRevenue: revenue,
    }));

    res.status(200).json({
      year: currentYear,
      workerId,
      revenue: formattedRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getMonthlyRevenueByWorker
};
