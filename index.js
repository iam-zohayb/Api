// Backend/Server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./Routes/FormRoutes');
const driverRoutes = require('./Routes/DriverRoutes');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://Zohaib:Zohaib@cluster0.v7oju4g.mongodb.net/';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/forms', formRoutes);
app.use('/api/drivers', driverRoutes); 
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
