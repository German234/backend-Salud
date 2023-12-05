const { param, body } = require("express-validator");
const moment = require('moment');

const createCitaValidator = [

  body('fecha_cita')
    .optional()
    .custom(value => {
      if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('Fecha de cita should be a valid date in format YYYY-MM-DD');
      }
      return true;
    }),

  body('hora_cita')
    .optional()
    .isString().withMessage('Hora de cita should be a string')
    .trim()
    .isLength({ min: 1, max: 5 }).withMessage('Hora de cita should have at least 1 character and at most 5 characters'),

  body('estado_cita')
    .optional()
    .isString().withMessage('Estado de cita should be a string')
    .trim()
    .isLength({ min: 2, max: 15 }).withMessage('Estado de cita should have at least 2 characters and at most 15 characters'),

  body('nombre_paciente')
    .optional()
    .isString().withMessage('Nombre de paciente should be a string')
    .trim()
    .isLength({ min: 1, max: 25 }).withMessage('Nombre de paciente should have at least 1 character and at most 25 characters'),

  body('id_doctor')
    .optional()
    .isString().withMessage('ID de doctor should be a string')
    .trim()
    .isLength({ min: 1, max: 25 }).withMessage('ID de doctor should have at least 1 character and at most 25 characters'),
];

const updateCitaValidator = [

  body('fecha_cita')
    .optional()
    .custom(value => {
      if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('Fecha de cita should be a valid date in format YYYY-MM-DD');
      }
      return true;
    }),

  body('hora_cita')
    .optional()
    .isString().withMessage('Hora de cita should be a string')
    .trim()
    .isLength({ min: 1, max: 5 }).withMessage('Hora de cita should have at least 1 character and at most 5 characters'),

  body('estado_cita')
    .optional()
    .isString().withMessage('Estado de cita should be a string')
    .trim()
    .isLength({ min: 2, max: 15 }).withMessage('Estado de cita should have at least 2 characters and at most 15 characters'),

  body('nombre_paciente')
    .optional()
    .isString().withMessage('Nombre de paciente should be a string')
    .trim()
    .isLength({ min: 1, max: 25 }).withMessage('Nombre de paciente should have at least 1 character and at most 25 characters'),

  body('id_doctor')
    .optional()
    .isString().withMessage('ID de doctor should be a string')
    .trim()
    .isLength({ min: 1, max: 25 }).withMessage('ID de doctor should have at least 1 character and at most 25 characters'),
];

module.exports = { createCitaValidator, updateCitaValidator };
