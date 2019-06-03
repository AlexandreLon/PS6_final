const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Applicant', {
  gender: Joi.string().required(),
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  pathways: Joi.string().required(),
  birth_date: Joi.string().required(),
  student_number: Joi.string().required(),
  nationality: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  zip: Joi.string().required(),
  mobile: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  last_year_path: Joi.string(),
  agreement_personnal_data: Joi.boolean(),
  grades_since_bac: Joi.array().items(Joi.number()),
});
