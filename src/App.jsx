import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './Pages/Home';
import { AuthProvider } from './utils/AuthContext';
import { VideoProvider } from './utils/VideoContext';

import PrivateRoutes from './utils/PrivateRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <VideoProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        </VideoProvider>
      </AuthProvider>
      
    </Router>
  );
};

export default AppRoutes;
