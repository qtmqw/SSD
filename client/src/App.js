import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { adminU } from './API'
import axios from 'axios'

import Navbar from './components/Navbar'
import Er from './components/404'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import Chats from './pages/Chats'

import Home from './pages/Home'
import About from './pages/About'
import AllCars from './pages/AllCars'
import TopCars from './pages/TopCars'
import Profile from './pages/Profile'
import Events from './pages/Events'
import Event from './pages/Event'
import Discussions from './pages/Discussions'


import AddEvent from './admin/AddEvent'
import AllUserCars from './admin/AllUserCars'
import AllUsers from './admin/AllUsers'

const App = () => {

  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(adminU , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const isLoggedIn = window.localStorage.getItem("loggedIn")

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all_cars" element={<AllCars />} />
        <Route path="/events" element={<Events />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/top_cars" element={<TopCars />} />
        <Route path="/profile/:username" element={isLoggedIn ? <Profile /> : <Home />} />
        <Route path="/e/:id" element={<Event />} />

        <Route path="/SignIn" element={!isLoggedIn ? <SignIn /> : <Home />} />
        <Route path="/SignUp" element={!isLoggedIn ? <SignUp /> : <Home />} />
        <Route path="/forgot_password" element={!isLoggedIn ? <ForgotPassword /> : <Home />} />

        <Route path="/admin/add_event" element={isAdmin ? <AddEvent /> : <Home />} />
        <Route path="/admin/all_user_cars" element={isAdmin ? <AllUserCars /> : <Home />} />
        <Route path="/admin/all_users" element={isAdmin ? <AllUsers /> : <Home />} />

        <Route path="/chats" element={<Chats />} />
        <Route path="/*" element={<Er />} />
      </Routes>
    </>
  )
}

export default App