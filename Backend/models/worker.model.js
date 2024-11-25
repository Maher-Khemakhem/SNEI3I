const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkerSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
    default: ''
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  email: {
    type: String,
    required: false
  },
  num_tel: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date, // Change to `Date` if you want to store as a date type
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number, // Change to `String` if you want to match the current db example
    required: true
  },
  rate: {
    type: Number, // Changed from `Float32Array` to `Number`
    required: true
  },
  number_of_messages: {
    type: String, // Consider changing to `Number` if it's a count
    required: true
  },
  certification: [
    {
      title: { type: String, required: true }, // Key: Certification title
      url: { type: String, required: true }, // Value: Certification description
    }
  ],
  autre_service: {
    type: [String], // Array of strings for multiple services
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  work_photo: {
    type: [String], // Array of strings for multiple work photos
    required: true
  },
  validated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Worker = mongoose.model("Worker", WorkerSchema);
module.exports = Worker;
