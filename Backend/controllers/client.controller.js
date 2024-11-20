const Client = require('../models/client.model');
const Reservation = require('../models/reservation.model');

// CREATE a new client
const createClient = async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ all clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ a single client by ID
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a client
const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a client
const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getReservationClient = async (req, res) => {
    try {
      const { id } = req.params; // `id` is the client ID
  
      // Find reservations for the specified client and populate related fields
      const reservations = await Reservation.find({ client: id })
        .populate('client', 'firstname lastname email') // Populate client details
        .populate('worker', 'firstname lastname speciality rate'); // Populate worker details
  
      // Check if any reservations were found
      if (reservations.length === 0) {
        return res.status(404).json({ message: 'No reservations found for this client.' });
      }
  
      res.status(200).json(reservations); // Return the populated reservations
    } catch (error) {
      console.error('Error fetching reservations for client:', error);
      res.status(500).json({ error: 'Failed to fetch reservations for this client.' });
    }
  };
module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    getReservationClient
};
