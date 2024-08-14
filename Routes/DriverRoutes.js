const express = require('express');
const router = express.Router();
const DriverDetails = require('../Models/DriverDetails');

// Create a new driver
router.post('/', async (req, res) => {
  try {
    const newDriver = new DriverDetails(req.body);
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get driver by Iqama number
router.get('/:iqamaNo', async (req, res) => {
  try {
    const driver = await DriverDetails.findOne({ السائق_هوية_رقم: req.params.iqamaNo });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update driver by Iqama number
router.put('/:iqamaNo', async (req, res) => {
  try {
    const updatedDriver = await DriverDetails.findOneAndUpdate(
      { السائق_هوية_رقم: req.params.iqamaNo },
      req.body,
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await DriverDetails.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
