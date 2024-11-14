const Worker = require('../models/worker.model');

const getrated = async (req, res) => {
  try {
    const workers = await Worker.find()
      .sort({ rate: -1 }) // Sort by rate in descending order
      .limit(3); // Limit to top 3 results

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving top-rated workers: ${error.message}` });
  }
};

module.exports = { getrated };
