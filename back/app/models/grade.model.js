const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Grade', {
  year: Joi.string().required(),
  studies_level: Joi.string().required(),
  establishment: Joi.string().required(),
  grade: Joi.number().required(),

});
