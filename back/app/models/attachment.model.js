const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Attachment', {
  url: Joi.string().required(),
  name: Joi.string().required(),

});
