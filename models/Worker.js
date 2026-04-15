const mongoose = require('mongoose')

const WorkerSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  phone: String,
  status: {
    type: String,
    default: "active"
  },
  address: String,
  favoriteTasks: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =  mongoose.model('Worker', WorkerSchema)
