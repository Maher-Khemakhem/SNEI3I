const express = require("express");
const router = express.Router();
const { getTopRatedWorkers,addOrUpdateRating,getWorkerRating,deleteWorkerRating } = require('../controllers/rate.controller');

// Routes for search functionality
//base route /rate
router.get('/toprated', getTopRatedWorkers);
router.put('/:id/rating', addOrUpdateRating);
router.get('/:id',getWorkerRating);
router.delete('/:id',deleteWorkerRating);

module.exports = router;
