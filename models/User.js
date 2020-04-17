// ===== User Model for Mongoose =====

// Requirements
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema
const UserSchema = new mongoose.Schema({
  // =====Example Schema Options=====
  //   username: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     trim: true,
  //     max: 15,
  //   },
  //   phoneNumber: {
  //     type: String,
  //     required: true,
  //     match: [
  //       /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
  //       'Please enter a valid phone number',
  //     ],
  //   },
  //   firstName: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },

  //   lastName: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },

  //   Email for this boiler plate
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

// Hash password with bcrypt before saving to database
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(12, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

// Compare entered password with stored password
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

// Export user schema model
module.exports = mongoose.model('User', UserSchema);
