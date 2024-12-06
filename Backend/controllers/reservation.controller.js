const Reservation = require("../models/reservation.model");
const mongoose = require("mongoose");
const Client = require("../models/client.model");
// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { client, worker, date, price, message } = req.body;

    const newReservation = new Reservation({
      client,
      worker,
      date,
      price,
      message,
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
      .populate("client", "firstname lastname email")
      .populate("worker", "firstname lastname speciality");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single reservation by ID
const getClientReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await Reservation.find({ client: id });

    if (!reservations) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getWorkerReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await Reservation.find({ worker: id });

    if (!reservations) {
      return res.status(404).json({ message: "Reservations not found" });
    }

    res.status(200).json(reservations);
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
      .populate("client", "firstname lastname email")
      .populate("worker", "firstname lastname speciality");

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
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
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMonthlyRevenueByWorker = async (req, res) => {
  try {
    const { workerId } = req.params; // Get the worker ID from request parameters
    const { year } = req.query; // Get year from query parameters or use current year

    const currentYear = year ? parseInt(year, 10) : new Date().getFullYear();

    const reservations = await Reservation.find({
      worker: workerId,
      date: {
        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
      },
      status: "Confirmed"
    });
    console.log(reservations);
    const monthlyRevenue = Array(12).fill(0);

    reservations.forEach((reservation) => {
      const month = new Date(reservation.date).getMonth();
      monthlyRevenue[month] += reservation.price;
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

const getTotalRevenueByWorker = async (req, res) => {
  try {
    const { workerId } = req.params; // Get the worker ID from request parameters

    // Validate the workerId to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid worker ID",
      });
    }

    // Aggregate the total revenue for the specific worker
    const totalRevenue = await Reservation.aggregate([
      {
        $match: {
          worker: new mongoose.Types.ObjectId(workerId), // Correct instantiation of ObjectId
          status: "Confirmed", // Optionally, include only confirmed reservations
        },
      },
      {
        $group: {
          _id: null, // We don't need to group by any specific field, so set it to null
          total: { $sum: "$price" }, // Sum the prices of all matching reservations
        },
      },
    ]);

    // If no revenue data is found, set total to 0
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    // Respond with the total revenue
    res.status(200).json({
      success: true,
      workerId,
      totalRevenue: revenue,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const getTotalRevenueThisMonth = async (req, res) => {
  try {
    const { workerId } = req.params; // Extract worker ID from request parameters
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Set the date to the first day of the current month
    startOfMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1); // Set the end of month to the start of the next month
    endOfMonth.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    // Aggregate the total revenue for the current month for a specific worker
    const totalRevenue = await Reservation.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lt: endOfMonth }, // Filter reservations within the current month
          status: "Confirmed", // Only include confirmed reservations
          worker: new mongoose.Types.ObjectId(workerId), // Match reservations for the specific worker
        },
      },
      {
        $group: {
          _id: null, // No grouping necessary
          total: { $sum: "$price" }, // Sum the prices of all confirmed reservations
        },
      },
    ]);

    // If no revenue data found, set total to 0
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
    console.log(revenue);
    // Respond with the total revenue for this month
    res.status(200).json({
      workerId,
      totalRevenue: revenue,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

const getTotalRevenueTodayForWorker = async (req, res) => {
  try {
    const { workerId } = req.params; // Get the worker ID from the request parameters

    // Get today's start and end time
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of today (00:00:00)

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999); // End of today (23:59:59)

    // Calculate the total revenue for the specific worker for today using aggregation
    const totalRevenue = await Reservation.aggregate([
      {
        $match: {
          worker: new mongoose.Types.ObjectId(workerId), // Use new to instantiate ObjectId
          date: { $gte: startOfDay, $lt: endOfDay }, // Match the date within today
          status: "Confirmed", // Only consider confirmed reservations
        },
      },
      {
        $group: {
          _id: null, // We don't need to group by anything specific
          total: { $sum: "$price" }, // Sum up the price for all matching reservations
        },
      },
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    // Respond with the total revenue for the worker
    res.status(200).json({
      success: true,
      workerId,
      totalRevenue: revenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const finished = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      'status':"Confirmed",
    }
    const reservation = await Reservation.findByIdAndUpdate(id,data);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const { year } = req.query; // Get year from query parameters or use the current year
    const currentYear = year ? parseInt(year, 10) : new Date().getFullYear();

    // Aggregate reservations to calculate monthly revenue
    const monthlyRevenueData = await Reservation.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
          },
          status: "Confirmed", // Only consider confirmed reservations
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" } }, // Group by month
          totalRevenue: { $sum: "$price" }, // Calculate the total revenue for each month
        },
      },
      {
        $sort: { "_id.month": 1 }, // Sort by month
      },
    ]);

    // Array of month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Format the output to include month names
    const formattedRevenue = Array.from({ length: 12 }, (_, index) => {
      const revenueData = monthlyRevenueData.find((data) => data._id.month === index + 1);
      return {
        month: monthNames[index], // Use the month name
        totalRevenue: revenueData ? revenueData.totalRevenue : 0, // Default to 0 if no data for the month
      };
    });

    res.status(200).json({
      year: currentYear,
      revenue: formattedRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getClientReservations,
  updateReservation,
  deleteReservation,
  getMonthlyRevenueByWorker,
  getTotalRevenueByWorker,
  getTotalRevenueThisMonth,
  getTotalRevenueTodayForWorker,
  getWorkerReservations,
  finished,
  getMonthlyRevenue
};
