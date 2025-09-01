import React from "react";
import BookAppointment from "../components/BookAppointment";

function Appointment() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Appointment Booking</h1>
      <BookAppointment />
    </div>
  );
}

export default Appointment;
