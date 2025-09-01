import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', form).then(() => {
      toast.success("Event created.");
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <form className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="w-full p-3 bg-gray-700 rounded text-white"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
