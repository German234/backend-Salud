const debug = require("debug")("app:clinica-api:db");
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const connect = async () => {
  try {
    await mongoose.connect(uri);
    debug("Connected successfully to database!");
  } catch (error) {
    debug("[Error]: Can't connect to database!");
  }
};

module.exports = { connect };
