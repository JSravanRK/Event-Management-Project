import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => setEventData(res.data))
      .catch(err => {
        toast.error("Failed to load data.");;
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/events/${id}`, eventData)
      .then(() => {
        toast.success('Event updated!');
        navigate('/');
      })
      .catch(err => {
        toast.error('Failed to update');
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
