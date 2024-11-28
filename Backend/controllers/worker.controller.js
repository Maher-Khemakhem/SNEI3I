const Worker = require("../models/worker.model");
const Offre = require("../models/offre.model");

const Reservation = require("../models/reservation.model");

// Create a new worker
const createWorker = async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
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
    const deletedWorker = await Worker.findByIdAndDelete(id);
    if (!deletedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ message: "Worker deleted successfully" });
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
    const offres = await Offre.find({ Worker_id: id })
      .populate({
        path: "Client_id",
        select: "name",
      })
      .select("_id Worker_id Client_id Client_location date status price")
      .sort({ date: -1 }); // Sort by date, -1 for descending order (newest first)

    if (offres.length === 0) {
      return res
        .status(404)
        .json({ message: "No offers found for this worker." });
    }
    res.status(200).json(offres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch offers for this worker." });
  }
};
const getReservationWorker = async (req, res) => {
  try {
    const { id } = req.params;

    // Find reservations for the worker and sort them by date in ascending order
    const reservations = await Reservation.find({ worker: id })
      .populate("client", "firstname lastname email") // Populate client details
      .populate("worker", "firstname lastname speciality rate location") // Populate worker details
      .sort({ date: 1 }); // Sort reservations by date (1 for ascending, -1 for descending)

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
module.exports = {
  createWorker,
  getWorkerById,
  getAllWorkers,
  updateWorker,
  deleteWorker,
  getReservationWorker,
  getWorkersBySpeciality,
  getOfferWorker,
};
