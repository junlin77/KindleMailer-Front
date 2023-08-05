import React, { useState } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Button } from '@chakra-ui/react';
import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle';
import axios from 'axios';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <div className="header">
      <div className="header-text">
        <h5>KindleMailer</h5>
        <p>Send books to your Kindle with ease.</p>
      </div>
      <div className="header-controls">
        <DarkModeToggle />
        {userProfile ? (
          <div className="user-profile">
            <Menu>
              <MenuButton as={Button} variant={'link'}>
                <img
                  src={userProfile.profile_picture}
                  alt="Profile"
                  className="profile-picture"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>📩 Set Kindle Email</MenuItem>
                <MenuItem onClick={logOut}>👋 Log out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <Button variant='ghost' onClick={login} className="header-button">
            Sign in with Google 🚀
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
