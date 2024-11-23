const express = require("express");
const router = express.Router();
const { createWorker,
    getWorkerById,
    getAllWorkers,
    updateWorker,
    deleteWorker,
    getReservationWorker,
    getWorkersBySpeciality } = require('../controllers/worker.controller');

// Routes for search functionality
//base route  /worker
router.get('/:id', getWorkerById);
router.get('/',getAllWorkers);
router.post('/create',createWorker);
router.put('/update/:id',updateWorker);
router.delete('/delete/:id',deleteWorker);
router.get('/reservation/:id', getReservationWorker);
router.get('/:speciality',getWorkersBySpeciality);
module.exports = router;

//