const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: 'user'
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', "staff", "player"],
    default: 'user'
  },
  goals: {
    type: Number,
    required: false,
    default: 0
  },
  assists: {
    type: Number,
    required: false,
    default: 0
  },
  minutesPlayed: {
    type: Number,
    required: false,
    default: 0
  },
  yellowCards: {
    type: Number,
    required: false,
    default: 0
  },
  redCards: {
    type: Number,
    required: false,
    default: 0
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;