const express = require("express");
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getMonthlyRevenueByWorker,
  getTotalRevenueByWorker,
  getTotalRevenueThisMonth,
  getTotalRevenueTodayForWorker,
  getClientReservations,
  getWorkerReservations,finished,
  getMonthlyRevenue
} = require("../controllers/reservation.controller");
const { requireAuth } = require("../middleware/auth.middleware");
//reservation
// Create a new reservation
router.post("/", createReservation);

// Get all reservations
router.get("/", getAllReservations);

// Get a single reservation by ID
router.get("/client/:id", getClientReservations);
router.get("/worker/:id", getWorkerReservations);
// Update a reservation by ID
router.put("/:id", updateReservation);

// Delete a reservation by ID
router.delete("/:id", deleteReservation);
router.get("/revenue/:workerId", getMonthlyRevenueByWorker);
router.get("/total/:workerId", getTotalRevenueByWorker);
router.get("/thismonth/:workerId", getTotalRevenueThisMonth);
router.get("/today/:workerId", getTotalRevenueTodayForWorker);
router.put("/finished/:id", finished);
router.get('/adminrevenue',getMonthlyRevenue)
module.exports = router;
