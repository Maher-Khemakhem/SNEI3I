const express = require("express");
const router = express.Router();
const { getpartner } = require('../controllers/partner.controller');

// Routes for search functionality

router.get('/', getpartner);
module.exports = router;
