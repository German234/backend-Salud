const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/;
const bloodType = /^(A\+|A-|B\+|B-|AB\+|AB-|O\+|O-)$/;

validators.registerUserValidator = [
  body("nombre").not().isEmpty().withMessage("El nombre es obligatorio"),
  body("apellido").not().isEmpty().withMessage("El apellido es obligatorio"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres")
    .matches(passwordRegexp)
    .withMessage("Password format incorret"),
  body("dui")
    .notEmpty()
    .withMessage("El dui es obligatorio")
    .isLength({ min: 9 })
    .withMessage("EL dui no puede ser menor de 9 digitos"),

  body("sexo").notEmpty().withMessage("Genero es obligatorio"),
  body("fechaNacimiento")
    .notEmpty()
    .withMessage("Fecha de nacimiento es obligatorio"),
  body("tipoSangre")
    .notEmpty()
    .withMessage("Tipo de sangre es obligatorio")
    .matches(bloodType)
    .withMessage("Tipo de sangre no valido"),
  body("numeroTelefono")
    .notEmpty()
    .withMessage("Numero de telefono es obligatorio"),
];

module.exports = validators;
