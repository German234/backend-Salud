const User = require("../models/user.model");
const { createToken, verifyToken } = require("../utils/jwt.tools");
const controller = {};

controller.register = async (req, res, next) => {
  try {
    const {
      nombre,
      apellido,
      password,
      dui,
      sexo,
      fechaNacimiento,
      tipoSangre,
      email,
      numeroTelefono,
    } = req.body;
    const user = await User.findOne({
      $or: [{ dui: dui }],
    });

    if (user) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const newUser = new User({
      nombre: nombre,
      apellido: apellido,
      dui: dui,
      sexo: sexo,
      fechaNacimiento: fechaNacimiento,
      tipoSangre: tipoSangre,
      email: email,
      numeroTelefono: numeroTelefono,
      password: password,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
};

controller.login = async (req, res, next) => {
  try {
    const { dui, password } = req.body;

    const user = await User.findOne({
      $or: [{ dui: dui }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.comparedPassword(password)) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = await createToken(user._id);

    let _tokens = [...user.tokens];

    const _verifyPromises = _tokens.map(async (_t) => {
      const status = await verifyToken(_t);
      return status ? _t : null;
    });

    _tokens = (await Promise.all(_verifyPromises))
      .filter((_t) => _t)
      .slice(0, 4);

    _tokens = [token, ..._tokens];
    user.tokens = _tokens;

    await user.save();

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = controller;
