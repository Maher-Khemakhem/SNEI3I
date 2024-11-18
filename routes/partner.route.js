const express = require("express");
const router = express.Router();
const { getpartner } = require('../controllers/partner.controller');

// Routes for search functionality
//base route /partner
router.get('/', getpartner);
module.exports = router;
