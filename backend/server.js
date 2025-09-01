const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true               // allow cookies
}));
app.use(express.json());

app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);
const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api/registrations', registrationRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);



app.listen(5000, () => console.log('Server started on port 5000'));

