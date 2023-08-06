import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterableBookTable from './components/FilterableBookTable';
import './App.css';
import BackToTopButton from './components/BackToTopButton';

export default function App() {
  const [userProfile, setUserProfile] = useState(null);

  const handleUserProfileUpdate = (newUserProfile) => {
    setUserProfile(newUserProfile);
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
