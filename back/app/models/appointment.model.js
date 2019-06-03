const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Appointment', {
  applicant_id: Joi.number().required(),
  starting_date: Joi.date().required(),
  ending_date: Joi.date().required(),
  type: Joi.string().required(),
  object: Joi.string().required(),
  status: Joi.boolean(),
});
