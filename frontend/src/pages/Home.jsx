import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then(res => setEvents(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        toast.success("Event deleted successfully");
        setEvents(events.filter(e => e._id !== id));
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">🎉 Upcoming Events</h1>

      <Link
        to="/create"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded mb-8"
      >
        + Create New Event
      </Link>

      <div className="w-full max-w-3xl space-y-6">
        {events.map(event => (
          <div key={event._id} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-300">{event.description}</p>
            <p className="mt-2"><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <div className="mt-4 flex gap-4">
              <Link to={`/edit/${event._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
                Edit
              </Link>
              <Link to={`/register/${event._id}`} className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded">
                Register
               </Link>

              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
