import React, { useState } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Button } from '@chakra-ui/react';
import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle';
import axios from 'axios';

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      sendTokenToBackend(tokenResponse.access_token);
    },
    onError: error => console.log('Login Failed:', error),
  });

  const sendTokenToBackend = async access_token => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { access_token });
      console.log('Backend response:', response.data);
      setUserProfile(response.data); // Set the user profile from the backend response
    } catch (error) {
      console.error('Error sending token:', error);
    }
  };

  const logOut = () => {
    googleLogout();
    setUserProfile(null); 
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };  

  return (
    <div className="header">
      <div className="header-text">
        <h5>KindleMailer</h5>
        <p>Send books to your Kindle with ease.</p>
      </div>
      <div className="header-controls">
        {userProfile ? (
          <div className="user-profile">
          <img
            src={userProfile.profile_picture}
            alt="Profile"
            className="profile-picture"
            onClick={openModal} // Open the modal when profile picture is clicked
          />
        </div>
        ) : (
          <Button variant='ghost' onClick={login} className="header-button">
            Sign in with Google 🚀
          </Button>
        )}
        <DarkModeToggle />
      </div>
      {isModalOpen && ( // Display the modal if isModalOpen is true
        <div className="modal">
          <div className="modal-content">
            <p>Do you want to log out?</p>
            <Button variant='ghost' onClick={logOut}>Log Out 👋</Button>
            <Button variant='ghost' onClick={closeModal}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
