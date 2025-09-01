import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminView() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then(res => setEvents(res.data));
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async (eventId = '') => {
    const url = eventId
      ? `http://localhost:5000/api/registrations?eventId=${eventId}`
      : `http://localhost:5000/api/registrations`;

    try {
      const res = await axios.get(url);
      setRegistrations(res.data);
    } catch (err) {
      alert("Failed to fetch registrations");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedEventId(value);
    fetchRegistrations(value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/registrations/${id}`);
      setRegistrations(registrations.filter((r) => r._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">All Event Registrations</h1>

      <div className="mb-6 flex justify-center">
        <select
          value={selectedEventId}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Events</option>
          {events.map(event => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id} className="border-t">
                <td className="px-4 py-2">{reg.eventId?.title || 'N/A'}</td>
                <td className="px-4 py-2">{reg.name}</td>
                <td className="px-4 py-2">{reg.email}</td>
                <td className="px-4 py-2">{reg.phone}</td>
                <td className="px-4 py-2">{new Date(reg.registeredAt).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(reg._id)}
                    className="text-red-500 hover:text-red-700 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No registrations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminView;
