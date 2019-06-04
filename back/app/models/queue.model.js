const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Queue', {
  real_time_appointments: Joi.array().items(Joi.number()),
  member: Joi.number().required(),
});
