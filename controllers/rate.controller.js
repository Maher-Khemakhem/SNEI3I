const Worker = require('../models/worker.model');

// Add or Update Rating
const addOrUpdateRating = async (req, res) => {
  try {
    const { id } = req.params; // Worker ID
    const { rate } = req.body; // New rating value

    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { rate },
      { new: true, runValidators: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ message: `Error updating rating: ${error.message}` });
  }
};

// Get Worker Rating
const getWorkerRating = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findById(id, 'rate'); // Retrieve only the rating

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: `Error fetching rating: ${error.message}` });
  }
};

// Delete Worker Rating (Reset Rating to 0)
const deleteWorkerRating = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { rate: 0 }, // Reset rating
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ message: `Error deleting rating: ${error.message}` });
  }
};

// Get Top Rated Workers
const getTopRatedWorkers = async (req, res) => {
  try {
    const workers = await Worker.find()
      .sort({ rate: -1 }) // Sort by rating in descending order
      .limit(3); // Limit to top 3 results

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving top-rated workers: ${error.message}` });
  }
};

module.exports = {
  addOrUpdateRating,
  getWorkerRating,
  deleteWorkerRating,
  getTopRatedWorkers,
};
