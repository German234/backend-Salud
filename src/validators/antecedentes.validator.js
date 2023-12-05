// antecedentes.validator.js
const { body } = require("express-validator");
const moment = require("moment");

const DATE_FORMAT = "DD/MM/YYYY";

const createAntecedentesValidator = [
    body("medico")
        .optional()
        .isString()
        .withMessage("El campo 'Médico' debe ser una cadena de texto"),

    body("alergias")
        .optional()
        .isString()
        .withMessage("El campo 'Alergias' debe ser una cadena de texto"),

    body("cirugias")
        .optional()
        .isString()
        .withMessage("El campo 'Cirugías' debe ser una cadena de texto"),

    body("nParejasSexuales")
        .optional()
        .isInt({ min: 0 })
        .withMessage("El campo 'Número de Parejas Sexuales' debe ser un número entero no negativo"),

    body("inicioRelaciones")
        .optional()
        .isDate({ format: DATE_FORMAT })
        .withMessage(`El campo 'Inicio de Relaciones Sexuales' debe tener el formato ${DATE_FORMAT} y ser una fecha válida`)
        .custom((value) => {
            const today = moment().startOf("day");
            const fechaRelaciones = moment(value, DATE_FORMAT, true);
            return fechaRelaciones.isValid() && fechaRelaciones.isBefore(today);
        })
        .withMessage("La fecha de inicio de relaciones debe ser anterior a la fecha actual"),

    body("medicacion")
        .optional()
        .isString()
        .withMessage("El campo 'Medicación' debe ser una cadena de texto"),

    body("haFumado")
        .optional()
        .isBoolean()
        .withMessage("El campo 'Ha Fumado' debe ser un valor booleano"),

    body("inicioFumado")
        .optional()
        .custom((value, { req }) => {
            if (req.body.haFumado) {
                const today = moment().startOf("day");
                const fechaFumado = moment(value, DATE_FORMAT, true);
                return fechaFumado.isValid() && fechaFumado.isBefore(today);
            }
            return true;
        })
        .withMessage(`El campo 'Inicio de Fumado' debe tener el formato ${DATE_FORMAT} y ser una fecha válida si ha fumado`),

    body("alcohol")
        .optional()
        .isBoolean()
        .withMessage("El campo 'Ha consumido Alcohol' debe ser un valor booleano"),

    body("inicioAlcohol")
        .optional()
        .custom((value, { req }) => {
            if (req.body.Alcohol) {
                const today = moment().startOf("day");
                const fechaAlcohol = moment(value, DATE_FORMAT, true);
                return fechaAlcohol.isValid() && fechaAlcohol.isBefore(today);
            }
            return true;
        })
        .withMessage(`El campo 'Inicio de Alcohol' debe tener el formato ${DATE_FORMAT} y ser una fecha válida si ha consumido alcohol`),

    body("consumeDrogas")
        .optional()
        .isBoolean()
        .withMessage("El campo 'Consume Drogas' debe ser un valor booleano"),

    body("inicioConsumoDrogas")
        .optional()
        .custom((value, { req }) => {
            if (req.body.consumeDrogas) {
                const today = moment().startOf("day");
                const fechaConsumoDrogas = moment(value, DATE_FORMAT, true);
                return fechaConsumoDrogas.isValid() && fechaConsumoDrogas.isBefore(today);
            }
            return true;
        })
        .withMessage(
            `El campo 'Inicio de Consumo de Drogas' debe tener el formato ${DATE_FORMAT} y ser una fecha válida si consume drogas`
        ),

    body("tipoDrogas")
        .optional()
        .isString()
        .withMessage("El campo 'Tipo de Drogas' debe ser una cadena de texto"),

    body("realizaEjercicio")
        .optional()
        .isBoolean()
        .withMessage("El campo 'Realiza Ejercicio' debe ser un valor booleano"),

    body("tiposEjercicio")
        .optional()
        .isString()
        .withMessage("El campo 'Tipos de Ejercicio' debe ser una cadena de texto"),
];

const updateAntecedentesValidator = createAntecedentesValidator;

module.exports = { createAntecedentesValidator, updateAntecedentesValidator };
