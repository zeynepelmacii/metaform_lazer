const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./Router/authRouter');
const userRouter = require('./Router/userRouter');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


const app = express();
app.use(express.json());


const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🚀 DB connection is done');

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);

    app.listen(PORT, () => {
        console.log(`🚀 Server has build up on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error starting server or connecting to DB:', err);
  }
};

startServer();


