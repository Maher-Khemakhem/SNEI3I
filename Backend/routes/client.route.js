const express = require('express');
const {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
} = require('../controllers/client.controller');

const router = express.Router();

// Route to create a client
router.post('/', createClient);

// Route to get all clients
router.get('/', getAllClients);

// Route to get a client by ID
router.get('/:id', getClientById);

// Route to update a client by ID
router.put('/:id', updateClient);

// Route to delete a client by ID
router.delete('/:id', deleteClient);

module.exports = router;
