const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('RealTimeAppointment', {
  real_timestamp: Joi.number().required(),
  appointment_id: Joi.number().required(),
});
