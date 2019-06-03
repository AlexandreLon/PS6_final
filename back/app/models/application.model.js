const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

// TODO : Set mandatories fields
module.exports = new BaseModel('Application', {
  date: Joi.date().required(),
  applicant_id: Joi.number().required(),
  status: Joi.boolean(),
  category: Joi.string().required(),

  year: Joi.string(),
  signature_date: Joi.number(),
  signature_place: Joi.string(),
  wishes: Joi.array().items(Joi.number()),
  attachments: Joi.array().items(Joi.number()),
  annotation: Joi.string(),

});
