import React, { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import ForgotPassword from './components/ForgotPassword'; 
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';
import './index.css'; // Global styles
import WhiskeyMenu from './components/WhiskeyMenu';
import WeekdaySpecials from './components/weekdaySpecials';
import HappyHour from './components/HappyHour';
import About from './components/About';
import { DrinkProvider } from './DrinkContext';
import ResetPassword from './components/ResetPassword';
import FoodMenu from './components/FoodMenu';
import { FoodProvider } from './FoodContext';
import BookEvent from './components/BookEvent';

function App() {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });
  const handleAuthComplete = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };
  return (
    <FoodProvider>
    <DrinkProvider>
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthForm onAuthComplete={handleAuthComplete}/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/weekday-specials" element={<WeekdaySpecials />} />
            <Route path='/reset-password/:token' element ={<ResetPassword />} />
            <Route path="/happy-hour" element={<HappyHour />} />
            <Route path="/about" element={<About />} />
            <Route path="/whiskey-menu" element={<WhiskeyMenu userRole={userRole} />} /> 
            <Route path="/food-menu" element={<FoodMenu userRole={userRole}/>} />
            <Route path="/events" element={<BookEvent />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <PrivateRoute isAdmin={userRole === 'admin'}>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </DrinkProvider>
    </FoodProvider>
  );
}

export default App;