const debug = require('debug')('clinica-api:error');
/*const errorHandler = (err, req, res, next) => {
	debug(err);
    return res.status(err.status || 500).json({ message: err.message });
};*/
const errorHandler =((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
  

module.exports = { errorHandler };