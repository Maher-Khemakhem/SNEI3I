const Worker = require('../models/worker.model');

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

module.exports = { getter, GetBySpeciality };
