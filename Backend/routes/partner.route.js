const express = require("express");
const router = express.Router();
const { getpartner, addpartner } = require("../controllers/partner.controller");

// Routes for search functionality
//base route /partner
router.get("/", getpartner);
router.post("/", addpartner);

module.exports = router;
