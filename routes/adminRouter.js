// =====Admin Routes=====

// Requirements
const express = require('express');
const adminRouter = express.Router();
const passport = require('passport');

// Verify admin route
adminRouter.get(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role === 'admin') {
      res
        .status(200)
        .json({ message: { msgBody: 'You are an admin', msgError: false } });
    } else
      res
        .status(403)
        .json({ message: { msgBody: 'You are not an admin', msgError: true } });
  }
);

// Export the admin routes
module.exports = adminRouter;
