const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jwt-auth', {
    userUrlParser: true,
    userUnifiedTopology: true
});

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`$Server is runnning on port ${PORT}`)
});