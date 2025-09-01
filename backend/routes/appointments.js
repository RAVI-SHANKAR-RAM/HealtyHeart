const express = require('express');
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Get all appointments for a user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (err) {
    console.error('Get appointments error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctorName, appointmentDate, reason, notes } = req.body;

    const newAppointment = new Appointment({
      user: req.user.id,
      doctorName,
      appointmentDate,
      reason,
      notes
    });

    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    console.error('Create appointment error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Delete an appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    // Check if user owns the appointment
    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    console.error('Delete appointment error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;