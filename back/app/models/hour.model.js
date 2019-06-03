const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Hour', {
  hour: Joi.number().required(),
  minute: Joi.number().required(),
});
