const express = require("express");
const router = express.Router();
const { getrated } = require('../controllers/rate.controller');

// Routes for search functionality

router.get('/', getrated);
module.exports = router;
