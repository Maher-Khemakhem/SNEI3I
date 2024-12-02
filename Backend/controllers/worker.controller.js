const Worker = require("../models/worker.model");
const Offre = require("../models/offre.model");
const mongoose = require("mongoose"); // Add this line at the top
const User = require("../models/user.model")
const Reservation = require("../models/reservation.model");

// Create a new worker
const createWorker = async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
    const a = {
      "email" : req.body.email,
      "password":req.body.password,
      "role":"worker",
      "id_role":admin._id,
  }
  const user = new User(a);
  await user.save();
    res.status(201).json(savedWorker);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating worker: ${error.message}` });
  }
};

// Get a single worker by ID
const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findById(id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching worker by ID: ${error.message}` });
  }
};

// Get all workers
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching workers: ${error.message}` });
  }
};

// Update a worker by ID
const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWorker = await Worker.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating worker: ${error.message}` });
  }
};

// Delete a worker by ID
const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedworker = await Worker.findByIdAndDelete(id);
    if (!deletedworker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    const user = await User.findOneAndDelete({ id_role: id});
    if (!user) {
      return res.status(404).json({ success: false, message: 'Associated user not found' });
    }
    res.status(200).json({ message: "Worker and user deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting worker: ${error.message}` });
  }
};
// get the offer of a worker by his ID, sorted by date
const getOfferWorker = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch offers for the worker with status 'pending' or 'Pending'
    const offres = await Offre.find({
      Worker_id: id,
      status: { $in: ["pending", "Pending"] }, // Matches both 'pending' and 'Pending'
    })
      .populate({
        path: "Client_id",
        select: "name",
      })
      .select("_id Worker_id Client_id Client_location date status price")
      .sort({ date: -1 }); // Sort by date, descending

    // Handle case where no pending offers are found
    if (offres.length === 0) {
      return res
        .status(404)
        .json({ message: "No pending offers found for this worker." });
    }

    // Respond with the pending offers
    res.status(200).json({ offre: offres });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch pending offers for this worker." });
  }
};

const getReservationWorker = async (req, res) => {
  try {
    const { id } = req.params;

    // Find reservations for the worker and sort them by date in descending order
    const reservations = await Reservation.find({ worker: id })
      .populate("client", "firstname lastname email") // Populate client details
      .populate("worker", "firstname lastname speciality rate location") // Populate worker details
      .sort({ date: -1 }); // Sort reservations by date in descending order

    // Check if any reservations were found
    if (reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for this worker." });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch reservations for this worker." });
  }
};

const getWorkersBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.params;

    // Assuming Worker model has a 'speciality' field
    const workers = await Worker.find({ speciality });

    if (workers.length === 0) {
      return res
        .status(404)
        .json({ message: "No workers found with the given speciality" });
    }

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching workers by speciality: ${error.message}`,
    });
  }
};

const acceptOffre = async (req, res) => {
  try {
    const { Worker_id, offre_id } = req.params; // Extract worker ID and offer ID from request parameters

    // Find and update the offer by ID and Worker_id
    const updatedOffre = await Offre.findOneAndUpdate(
      { _id: offre_id, Worker_id }, // Match the specific offer and worker
      { status: "Accepted" }, // Set status to "Accepted"
      { new: true } // Return  the updated document
    );

    // If no offer was found, respond with an error
    if (!updatedOffre) {
      return res.status(404).json({
        success: false,
        message: "Offre not found or worker ID mismatch.",
      });
    }

    // Respond with the updated offer
    res.status(200).json({
      success: true,
      message: "Offre accepted successfully.",
      data: updatedOffre,
    });
  } catch (error) {
    // Handle errors and respond with a 500 status
    res.status(500).json({
      success: false,
      message: `Error modifying offre: ${error.message}`,
    });
  }
};
const rejectOffre = async (req, res) => {
  try {
    const { Worker_id, offre_id } = req.params;

    // Validate Worker_id and offre_id
    if (
      !mongoose.Types.ObjectId.isValid(Worker_id) ||
      !mongoose.Types.ObjectId.isValid(offre_id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Worker ID or Offer ID.",
      });
    }

    // Update the offer to set status as "Rejected"
    const updatedOffre = await Offre.findOneAndUpdate(
      { _id: offre_id, Worker_id },
      { status: "Rejected" },
      { new: true }
    );

    // If no offer was found
    if (!updatedOffre) {
      return res.status(404).json({
        success: false,
        message: "Offre not found or worker ID mismatch.",
      });
    }

    // Respond with the updated offer
    res.status(200).json({
      success: true,
      message: "Offre rejected successfully.",
      data: updatedOffre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error rejecting offre: ${error.message}`,
    });
  }
};

module.exports = {
  createWorker,
  getWorkerById,
  getAllWorkers,
  updateWorker,
  deleteWorker,
  getReservationWorker,
  getWorkersBySpeciality,
  getOfferWorker,
  acceptOffre,
  rejectOffre,
};
