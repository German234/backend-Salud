const express = require("express");
const router = express.Router();

const {
  createCita,
  getCitas,
  getOneCita,
  updateCita,
  deleteOneCita,
} = require("../controllers/cita.controller");

const {
  createCitaValidator,
  updateCitaValidator,
} = require("../validators/cita.validator");

const runValidation = require("../validators/index.middleware");

router.get("/", getCitas);
router.get("/:id", getOneCita);
router.post("/", createCitaValidator, runValidation, createCita);
router.put("/:id", updateCitaValidator, runValidation, updateCita);
router.delete("/:id", deleteOneCita);

module.exports = router;
