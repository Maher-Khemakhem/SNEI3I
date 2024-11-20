const express = require("express");
const router = express.Router();
const { createWorker,
    getWorkerById,
    getAllWorkers,
    updateWorker,
    deleteWorker, } = require('../controllers/worker.controller');

// Routes for search functionality
//base route  /worker
router.get('/:id', getWorkerById);
router.get('/',getAllWorkers);
router.post('/create',createWorker);
router.put('/update/:id',updateWorker);
router.delete('/delete/:id',deleteWorker);
module.exports = router;