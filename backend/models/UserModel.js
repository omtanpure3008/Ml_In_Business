const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
  });
  
  const { error } = schema.validate(data);
  
  return error;
};


module.exports = {
  User: mongoose.model('User', userSchema),
  validateUser
};