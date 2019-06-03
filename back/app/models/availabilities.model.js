const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Availabilities', {
  monday: Joi.array().items(Joi.number()).required(),
  tuesday: Joi.array().items(Joi.number()).required(),
  wednesday: Joi.array().items(Joi.number()).required(),
  thursday: Joi.array().items(Joi.number()).required(),
  friday: Joi.array().items(Joi.number()).required(),
});
