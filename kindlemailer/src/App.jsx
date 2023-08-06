import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterableBookTable from './components/FilterableBookTable';
import './App.css';
import BackToTopButton from './components/BackToTopButton';

export default function App() {
  const [userProfile, setUserProfile] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userProfile");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserProfile(foundUser);
    }
  }, []);

  // Update the userProfile state and localStorage
  const handleUserProfileUpdate = (newUserProfile) => {
    setUserProfile(newUserProfile);
    localStorage.setItem('userProfile', JSON.stringify(newUserProfile));
  };

  return (
    <div className="app-container">
      <Header userProfile={userProfile} setUserProfile={handleUserProfileUpdate} />
      <div>
        <FilterableBookTable userProfile={userProfile} />
        <BackToTopButton />
      </div>
      <Footer />
    </div>
  );
}
