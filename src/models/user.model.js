const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },

  dui: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 9,
    maxlength: 9,
  },
  sexo: {
    type: String,
    enum: ["masculino", "femenino"],
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  tipoSangre: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  numeroTelefono: {
    type: String,
    required: true,
    match: /^\d{8,15}$/,
  },

  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  tokens: {
    type: [String],
    default: [],
  },
});

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      const _password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString("hex");

      return _password;
    } catch (error) {
      debug(error);
      return "";
    }
  },
  makeSalt: function () {
    return crypto.randomBytes(16).toString("hex");
  },
  comparedPassword: function (password) {
    return this.hashedPassword === this.encryptPassword(password);
  },
};

userSchema
  .virtual("password")
  .set(function (password = crypto.randomBytes(16).toString()) {
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  });

module.exports = Mongoose.model("User", userSchema);
