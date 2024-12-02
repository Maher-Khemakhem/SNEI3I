const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// CRUD Routes
router.post('/', adminController.createAdmin);       // Create
router.get('/', adminController.getAllAdmins);       // Read All
router.get('/:id', adminController.getAdminById);   // Read By ID
router.put('/:id', adminController.updateAdmin);    // Update
router.delete('/:id', adminController.deleteAdmin); // Delete

module.exports = router;
