// antecedentes.router.js
const express = require("express");
const router = express.Router();

const {
  createAntecedentes,
  getAntecedentes,
  getOneAntecedentes,
  updateAntecedentes,
  deleteOneAntecedentes,
} = require("../controllers/antecedentes.controller");

const {
  createAntecedentesValidator,
  updateAntecedentesValidator,
} = require("../validators/antecedentes.validator");

const runValidation = require("../validators/index.middleware");

// Rutas
router.get("/", getAntecedentes);
router.get("/:id", getOneAntecedentes);
router.post("/", createAntecedentesValidator, runValidation, createAntecedentes);
router.put("/:id", updateAntecedentesValidator, runValidation, updateAntecedentes);
router.delete("/:id", deleteOneAntecedentes);

module.exports = router;
