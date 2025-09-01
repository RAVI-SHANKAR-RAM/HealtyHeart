useState=require("react");

export default function BookAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:4000/api/appointments/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: "replace_with_patient_id", // get from login
        doctorId,
        date,
        timeSlot,
      }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 shadow rounded-2xl">
      <h2 className="text-xl font-bold mb-4">📅 Book an Appointment</h2>

      <input className="w-full p-2 mb-3 border rounded"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)} />

      <input type="date" className="w-full p-2 mb-3 border rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)} />

      <input className="w-full p-2 mb-3 border rounded"
        placeholder="Time Slot (e.g. 10:00-10:30)"
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)} />

      <button onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Book Appointment
      </button>
    </div>
  );
}
