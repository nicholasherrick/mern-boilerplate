// ===== Express Server =====

// Configures .env
require('dotenv').config();

// Requirements
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

// Sets back-end server port
const PORT = process.env.PORT || 3001;

// Parsing
app.use(cookieParser());
app.use(express.json());

// Connect to mongodb database with mongoose
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Mongodb database connected successfully');
  }
);

// Routes
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');
const adminRouter = require('./routes/adminRouter');
app.use('/auth', authRouter);
app.use('/todo', todoRouter);
app.use('/admin', adminRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get(`/`, function (req, res) {
    res.sendFile(path.join(__dirname, `build`, `index.html`));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on PORT${PORT}, go to localhost:${PORT}/`);
});
