const Offre = require('../models/offre.model'); // Adjust the path if necessary
const Reservation = require('../models/reservation.model');
// Create a new offer
const createOffre = async (req, res) => {
  try {
    const { Client_id, Worker_id, Client_location, date } = req.body;

    // Create a new offer with default status as 'pending'
    const newOffre = new Offre({
      Client_id:Client_id,
      Worker_id: Worker_id || 0,
      Client_location: Client_location || 0,
      date,
      status: 'pending', // Default status
    });

    const savedOffre = await newOffre.save();
    res.status(201).json(savedOffre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all offers
const getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find();
    res.status(200).json(offres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single offer by ID
const getOffreById = async (req, res) => {
  try {
    const { id } = req.params;
    const offre = await Offre.findById(id);

    if (!offre) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json(offre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an offer by ID
const updateOffre = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Find the existing offer
      const existingOffre = await Offre.findById(id);
      if (!existingOffre) {
        return res.status(404).json({ message: 'Offer not found' });
      }
  
      // Check if the status is being updated to "accepted"
      const isStatusChangingToAccepted =
        updatedData.status && updatedData.status.toLowerCase() === 'accepted';
  
      // Update the offer
      const updatedOffre = await Offre.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
      });
  
      // If the status is being changed to "accepted", create a reservation
      if (isStatusChangingToAccepted) {
        const newReservation = new Reservation({
          client: existingOffre.Client_id, // Assuming this is a valid ObjectId for the client
          worker: existingOffre.Worker_id, // Assuming this is a valid ObjectId for the worker
          date: existingOffre.date || new Date(), // Use the offer's date or the current date
          status: 'Pending', // Default status for reservations
          price: existingOffre.price, // Price, default to 0 if not provided
        });
  
        const savedReservation = await newReservation.save();
        res.status(201).json({
          message: 'Offer updated and reservation created successfully',
          updatedOffre,
          reservation: savedReservation,
        });
        return;
      }
  
      res.status(200).json(updatedOffre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// Delete an offer by ID
const deleteOffre = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOffre = await Offre.findByIdAndDelete(id);

    if (!deletedOffre) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOffre,
  getAllOffres,
  getOffreById,
  updateOffre,
  deleteOffre,
};