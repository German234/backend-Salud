const express = require("express");
const router = express.Router();

const { registerUserValidator } = require("../validators/auth.validator");
const authController = require("../controllers/auth.controller");

const runValidation = require("../validators/index.middleware");

const { authentication } = require("../middleware/validator.middleware");

router.post(
  "/register",
  registerUserValidator,
  runValidation,
  authController.register
);

router.post("/login", authController.login);

module.exports = router;
