const React = require('react');
const { useState, useEffect } = require('react');
// const { useState, useEffect, useContext } = require('react');
// const { useAuth } = require('../context/AuthContext');
const { toast } = require('react-toastify');
const api = require('../services/api');
require('./Appointment.css');

const Appointment = () => {
  // const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: '',
    appointmentDate: '',
    reason: '',
    notes: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', formData);
      toast.success('Appointment booked successfully!');
      setShowForm(false);
      setFormData({
        doctorName: '',
        appointmentDate: '',
        reason: '',
        notes: ''
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to book appointment');
    }
  };

  const cancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`);
        toast.success('Appointment cancelled successfully!');
        fetchAppointments();
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        toast.error('Failed to cancel appointment');
      }
    }
  };

  if (loading) {
    return React.createElement('div', { className: 'container' }, 'Loading appointments...');
  }

  return React.createElement('div', { className: 'appointment-page' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'appointment-header' },
        React.createElement('h1', null, 'Appointment Management'),
        React.createElement('button', {
          className: 'btn btn-primary',
          onClick: () => setShowForm(!showForm)
        }, showForm ? 'Cancel' : 'Book New Appointment')
      ),

      showForm && React.createElement('div', { className: 'appointment-form-card' },
        React.createElement('h2', null, 'Book New Appointment'),
        React.createElement('form', { onSubmit: handleSubmit },
          React.createElement('div', { className: 'form-row' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Doctor Name *'),
              React.createElement('input', {
                type: 'text',
                name: 'doctorName',
                value: formData.doctorName,
                onChange: handleInputChange,
                required: true
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Appointment Date & Time *'),
              React.createElement('input', {
                type: 'datetime-local',
                name: 'appointmentDate',
                value: formData.appointmentDate,
                onChange: handleInputChange,
                required: true
              })
            )
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Reason for Visit *'),
            React.createElement('input', {
              type: 'text',
              name: 'reason',
              value: formData.reason,
              onChange: handleInputChange,
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Additional Notes'),
            React.createElement('textarea', {
              name: 'notes',
              value: formData.notes,
              onChange: handleInputChange,
              rows: 3
            })
          ),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Book Appointment')
        )
      ),

      React.createElement('div', { className: 'appointments-list' },
        React.createElement('h2', null, 'Your Appointments'),
        appointments.length === 0 ? (
          React.createElement('p', null, 'No appointments scheduled yet.')
        ) : (
          appointments.map(appointment => (
            React.createElement('div', { key: appointment._id, className: 'appointment-card' },
              React.createElement('div', { className: 'appointment-info' },
                React.createElement('h3', null, appointment.doctorName),
                React.createElement('p', null, 
                  React.createElement('strong', null, 'Date: '),
                  new Date(appointment.appointmentDate).toLocaleString()
                ),
                React.createElement('p', null, 
                  React.createElement('strong', null, 'Reason: '),
                  appointment.reason
                ),
                appointment.notes && React.createElement('p', null, 
                  React.createElement('strong', null, 'Notes: '),
                  appointment.notes
                ),
                React.createElement('p', null, 
                  React.createElement('strong', null, 'Status: '),
                  React.createElement('span', { className: `status-${appointment.status}` }, appointment.status)
                )
              ),
              appointment.status === 'scheduled' && React.createElement('button', {
                className: 'btn btn-danger',
                onClick: () => cancelAppointment(appointment._id)
              }, 'Cancel Appointment')
            )
          ))
        )
      )
    )
  );
};

module.exports = Appointment;
