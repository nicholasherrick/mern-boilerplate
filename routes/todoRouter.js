// =====Todo Routes=====

// Requirements
const express = require('express');
const todoRouter = express.Router();
const passport = require('passport');
const Todo = require('../models/Todo');
const User = require('../models/User');

// Get all todos
todoRouter.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('todos')
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: 'Error has occurred', msgError: true },
          });
        else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
  }
);

// Create a todo
todoRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: 'Error has occurred', msgError: true } });
      else {
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: 'Error has occurred', msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: 'Todo successfully created',
                msgError: false,
              },
            });
        });
      }
    });
  }
);

// Export the todo routes
module.exports = todoRouter;
