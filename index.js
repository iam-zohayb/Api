
// Backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./Routes/FormRoutes');
const driverRoutes = require('./Routes/DriverRoutes');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const PORT =  5000;
const MONGODB_URI = 'mongodb+srv://Zohaib:Zohaib@cluster0.v7oju4g.mongodb.net/';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
  });
app.use('/api/forms', formRoutes);
app.use('/api/drivers', driverRoutes); 
app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
