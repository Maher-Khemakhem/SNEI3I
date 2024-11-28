const Worker = require('../models/worker.model');
/////
// Search workers by keyword and location
const getter = async (req, res) => {
  try {
    const { motcle, location } = req.params;
    
    if (!motcle || !location) {
      return res.status(400).json({ message: "motcle and location are required." });
    }

    const workers = await Worker.find({
      location,
      description: { $regex: motcle, $options: "i" },
      validated: true,
    });

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: `Error searching workers by keyword and location: ${error.message}` });
  }
};

// Search workers by speciality
const GetBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.params;

    if (!speciality) {
      return res.status(400).json({ message: "Speciality is required." });
    }

    const workers = await Worker.find({ speciality: { $regex: speciality, $options: "i" } });
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: `Error searching workers by speciality: ${error.message}` });
  }
};
const getByPriceandLocation = async (req, res) => {
  try {
    const { price,speciality } = req.params;

    if (!speciality) {
      return res.status(400).json({ message: "Speciality is required." });
    }
    if(!price){
      return res.status(400).json({ message: "price is required." });
    }

    const workers = await Worker.find({ speciality: { $regex: speciality, $options: "i" },price });
    res.status(200).json({workers:workers});
  } catch (error) {
    res.status(500).json({ message: `Error searching workers by speciality: ${error.message}` });
  }
};
const getAllLocations = async (req, res) => {
  try {
    // Use the distinct method to get unique values from the "location" field
    const locations = await Worker.distinct('location');

    // Send the locations back to the client
    res.status(200).json({ locations:locations });
  } catch (error) {
    res.status(500).json({ message: `Error fetching locations: ${error.message}` });
  }
};
const getAllPrices = async (req, res) => {
  try {
    // Use the distinct method to get unique values from the "location" field
    const prices = await Worker.distinct('price');

    // Send the locations back to the client
    res.status(200).json({ prices:prices });
  } catch (error) {
    res.status(500).json({ message: `Error fetching locations: ${error.message}` });
  }
};
const getAllSpecialities = async (req, res) => {
  try {
    // Use the distinct method to get unique values from the "location" field
    const specialities = await Worker.distinct('speciality');

    // Send the locations back to the client
    res.status(200).json({ specialities:specialities });
  } catch (error) {
    res.status(500).json({ message: `Error fetching locations: ${error.message}` });
  }
};
module.exports = { getter, GetBySpeciality,getByPriceandLocation,getAllLocations,getAllPrices,getAllSpecialities };
