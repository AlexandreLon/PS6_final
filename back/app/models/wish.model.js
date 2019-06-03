const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Wish', {
  priority: Joi.number().required(),
  university: Joi.string().required(),
  country: Joi.string().required(),
  in_charge_teacher: Joi.string().required(),
});
