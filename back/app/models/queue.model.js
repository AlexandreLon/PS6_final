const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Queue', {
    appointment: Joi.array().items(Joi.number()),
    member: Joi.number().required()
});
