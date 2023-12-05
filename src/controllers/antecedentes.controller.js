const httpError = require("http-errors");
const Antecedentes = require('../models/antecedentes.model'); // Ajusta la ruta según tu estructura

const createAntecedentes = async (req, res, next) => {
  try {
    const { body } = req;
    const newAntecedentes = new Antecedentes(body);
    const savedAntecedentes = await newAntecedentes.save();
    if (!savedAntecedentes) throw httpError(500, "No se pudieron crear los antecedentes médicos");
    res.status(201).json({ message: "Antecedentes médicos creados", data: savedAntecedentes });
  } catch (error) {
    next(error);
  }
};

const getAntecedentes = async (req, res, next) => {
  try {
    const antecedentes = await Antecedentes.find();
    if (!antecedentes) throw httpError(404, "No se encontraron antecedentes médicos");
    res.status(200).json({ data: antecedentes });
  } catch (error) {
    next(error);
  }
};

const getOneAntecedentes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const antecedentes = await Antecedentes.findById(id);
    if (!antecedentes) throw httpError(404, "No se encontraron antecedentes médicos");
    res.status(200).json({ data: antecedentes });
  } catch (error) {
    next(error);
  }
};

const updateAntecedentes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const toUpdateAntecedentes = await Antecedentes.findById(id);
    if (!toUpdateAntecedentes) throw httpError(404, "No se encontraron antecedentes médicos para actualizar");
    const updatedAntecedentes = await Antecedentes.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedAntecedentes) throw httpError(500, "No se pudieron actualizar los antecedentes médicos");
    res.status(200).json({ message: "Antecedentes médicos actualizados", data: updatedAntecedentes });
  } catch (error) {
    next(error);
  }
};

const deleteOneAntecedentes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const antecedentes = await Antecedentes.findById(id);
    if (!antecedentes) throw httpError(404, "No se encontraron antecedentes médicos");
    const antecedentesOneDelete = await Antecedentes.deleteOne({ _id: id });
    if (!antecedentesOneDelete) throw httpError(500, "No se pudieron eliminar los antecedentes médicos");
    res.status(200).json({ message: "Antecedentes médicos eliminados exitosamente", data: antecedentes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAntecedentes,
  getAntecedentes,
  getOneAntecedentes,
  updateAntecedentes,
  deleteOneAntecedentes,
};
