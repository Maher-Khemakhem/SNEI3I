const express = require("express");
const router = express.Router();
const {
  createWorker,
  getWorkerById,
  getAllWorkers,
  updateWorker,
  deleteWorker,
  getReservationWorker,
  getWorkersBySpeciality,
  getOfferWorker,
  acceptOffre,
  rejectOffre,
  uploadWorkPhotos,
} = require("../controllers/worker.controller");

// Routes for search functionality
//base route  /worker
router.get("/:id", getWorkerById);
router.get("/", getAllWorkers);
router.post("/create", createWorker);
router.put("/update/:id", updateWorker);
router.delete("/delete/:id", deleteWorker);
router.get("/reservation/:id", getReservationWorker);
router.get("/offre/:id", getOfferWorker);
router.get("/speciality/:speciality", getWorkersBySpeciality);
router.put("/acceptOffre/:Worker_id/:offre_id", acceptOffre);
router.post("/updatephoto/:Worker_id", uploadWorkPhotos);
router.put("/rejectOffre/:Worker_id/:offre_id", rejectOffre);
module.exports = router;

//
