// =====Authentication Routes=====

// Requirements
const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: 'jwtMagic',
      sub: userId,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Register a new User
authRouter.post('/register', (req, res) => {
  const { email, password, role } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: 'Error has occurred', msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: 'Email is already taken', msgError: true },
      });
    else {
      const newUser = new User({ email, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: 'Error has occurred', msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: 'Account created successfully',
              msgError: false,
            },
          });
      });
    }
  });
});

// Login a user
authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, email, role } = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { email, role } });
    }
  }
);

// Logout a user
authRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { email: '', role: '' }, success: true });
  }
);

// Keep user logged in
authRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { email, role } });
  }
);

// Export the authentication routes
module.exports = authRouter;
