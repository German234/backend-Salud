const {Schema, model} = require('mongoose');

// Definir el esquema del modelo de antecedentes médicos
const antecedentesSchema = new Schema({
  medico: {
    type: String,
    required: true,
  },
  alergias: {
    type: String,
    required: true,
  },
  cirugias: {
    type: String,
    required: true,
  },
  nParejasSexuales: {
    type: Number,
    required: true,
  },
  inicioRelaciones: {
    type: Date,
    required: true,
  },
  medicacion: {
    type: String,
    required: true,
  },
  haFumado: {
    type: Boolean,
    required: true,
  },
  inicioFumado: {
    type: Date,
  },
  alcohol: {
    type: Boolean,
    required: true,
  },
  inicioAlcohol: {
    type: Date,
  },
  consumeDrogas: {
    type: Boolean,
    required: true,
  },
  inicioConsumoDrogas: {
    type: Date,
  },
  tipoDrogas: {
    type: String,
  },
  realizaEjercicio: {
    type: Boolean,
    required: true,
  },
  tiposEjercicio: {
    type: String,
  },
});

// Exportar el modelo
module.exports = model("Antecedentes", antecedentesSchema);
