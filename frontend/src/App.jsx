import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import RegisterEvent from './pages/RegisterEvent';
import AdminView from './pages/AdminView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';




function App() {
    const [user, setUser] = useState(null);

     useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
      <>
    <BrowserRouter>
    <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home />} />

        
        <Route
         path="/create"
             element={
           <ProtectedRoute user={user}>
            <CreateEvent />
            </ProtectedRoute>
              }
           />

        <Route path="/edit/:id" element={<EditEvent />} />
        <Route path="/register/:id" element={<RegisterEvent />} />

        <Route
          path="/admin"
          element={
          <ProtectedRoute user={user} adminOnly={true}>
           <AdminView />
           </ProtectedRoute>
           }
          />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
       path="/profile"
       element={
        <ProtectedRoute user={user}>
        <Profile user={user} />
       </ProtectedRoute>
       }
       />


      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
