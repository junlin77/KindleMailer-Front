import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterableBookTable from './components/FilterableBookTable';
import './App.css';
import BackToTopButton from './components/BackToTopButton';
import Pagination from './components/Pagination';

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <FilterableBookTable userProfile={userProfile} currentPage={currentPage}/>
        <BackToTopButton />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
