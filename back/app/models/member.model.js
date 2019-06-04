const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Member', {
  id: Joi.number().required(),
  name: Joi.string().required(),
});
