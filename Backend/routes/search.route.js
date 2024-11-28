const express = require("express");
const router = express.Router();
const { getter, GetBySpeciality,getByPriceandLocation,getAllLocations,getAllPrices,getAllSpecialities } = require('../controllers/search.controller');

// Routes for search functionality
//base route  /search
router.get('/speciality/:speciality', GetBySpeciality);
router.get('/:motcle/:location', getter);
router.get('/:price/:location',getByPriceandLocation)
router.get('/location',getAllLocations);
router.get('/price',getAllPrices);
router.get('/speciality',getAllSpecialities);
module.exports = router;
