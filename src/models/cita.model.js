const { Schema, model } = require('mongoose');
const moment = require('moment');

const citaSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  fecha_cita: {
    type: Date,
    required: true,
  },
  hora_cita: {
    type: String,
    required: true,
    maxLength: 5,
  },
  estado_cita: {
    type: String,
    required: false,
    maxLength: 15,
  },
  nombre_paciente: {
    type: String,
    required: true,
    maxLength: 25,
  },
  id_doctor: {
    type: String,
    required: false,
    maxLength: 25,
  },
});

/*citaSchema.pre('save', function (next) {
  this.fecha_cita = moment(this.fecha_cita).format('DD/MM/YYYY');
  next();
});*/

module.exports = model("Cita", citaSchema);
