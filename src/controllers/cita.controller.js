const httpError = require("http-errors");
const Cita = require('../models/cita.model'); // Ajusta la ruta según tu estructura

const createCita = async (req, res, next) => {
  try{
    const {body} =req;
    const newCita = new Cita(body);
    const savedCita = await newCita.save();
    if (!savedCita) throw httpError(500, "La cita no se creo");
    res.status(201).json({message: "La cita se creo", data: savedCita});
  }catch(error){
    next(error);
  }
};

const getCitas = async (req, res, next) => {
    try{
      const citas = await Cita.find();
      if (!citas) throw httpError(404, "No se encontraron citas");
      res.status(200).json({data: citas});
    }catch(error){
      next(error);
    }
  };

  //Get one cita
  const getOneCita = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findById(id);
        if (!cita) throw httpError(404, "La cita no se encontro");
        res.status(200).json({ data: cita });
    } catch (error) {
        next(error);
    }
  };

  const updateCita = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const toUpdateCita = await Cita.findById(id);
        if (!toUpdateCita) throw httpError(404, "La cita no se encontro");
        const updatedCita = await Cita.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!updatedCita) throw httpError(500, "La cita no se actualizo");
        res.status(200).json({ message: "La cita se actualizo", data: updatedCita });
    } catch (error) {
        next(error);
    }
  };

  const deleteOneCita = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findById(id);
        if (!cita) throw httpError(404, "La cita no se encontró");
        const citaOneDelete =await Cita.deleteOne();
        if(!citaOneDelete) throw httpError(500, "La cita no se elimino")
        res.status(200).json({ message: "La cita se elimno exitosamente", data: cita});
    } catch (error) {
        next(error);
    }
  };

module.exports = {
    createCita,
    getCitas,
    getOneCita,
    updateCita,
    deleteOneCita,
};