// ===== Todo Model for Mongoose =====

// Requirements
const mongoose = require('mongoose');

// Schema
const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Export user schema model
module.exports = mongoose.model('Todo', TodoSchema);
