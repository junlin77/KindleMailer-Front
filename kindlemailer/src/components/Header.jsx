import React, { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'; 
import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle';
import axios from 'axios';
import { Menu, MenuButton, MenuList, MenuItem, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';

const Header = ({ userProfile, setUserProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [kindleEmail, setKindleEmail] = useState('');
  const [currentKindleEmail, setCurrentKindleEmail] = useState('');

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
      setUserProfile(response.data);
      setKindleEmail(response.data.kindle_email);
      // Save the userProfile in localStorage
      localStorage.setItem('userProfile', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error sending token:', error);
    }
  };

  useEffect(() => {
    // Fetch the current Kindle email and update the state
    const fetchCurrentKindleEmail = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get_kindle_email/', {
          params: { user_id: userProfile.user_id },
        });
        console.log('Current Kindle email:', response.data.kindle_email);
        setCurrentKindleEmail(response.data.kindle_email);
      } catch (error) {
        console.error('Error fetching Kindle email:', error);
      }
    };
    // Check if userProfile is not null before fetching
    if (userProfile) {
      fetchCurrentKindleEmail();
    }
  }, [isModalOpen, userProfile]); 
  
  const logOut = () => {
    googleLogout();
    setUserProfile(null);
    localStorage.clear();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email) || email === '';
  };  

  const setKindleEmailBackend = async () => {
    if (!isValidEmail(kindleEmail) || kindleEmail === currentKindleEmail || kindleEmail === '') {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/set_kindle_email/', {
        user_id: userProfile.user_id, 
        kindle_email: kindleEmail,
      });
      console.log('Kindle email set:', response.data);
      closeModal();

      // Update the userProfile state after setting new email
      const newUserProfile = { ...userProfile, kindle_email: kindleEmail };
      setUserProfile(newUserProfile);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Kindle email updated successfully.',
      });
  
    } catch (error) {
      console.error('Error setting Kindle email:', error);
      closeModal();

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating Kindle email.',
      });
    }
  };

  return (
    <div className="header">
      <div className="header-text">
        <h5>KindleMailer 📖</h5>
        <p>Send books to your Kindle with ease.</p>
      </div>
      <div className="header-controls">
        <DarkModeToggle />
        {userProfile ? (
          <div className="user-profile">
            <Menu>
              <MenuButton as={Button} variant={'link'} className='menu-button'>
                <div className="profile-icon-container">
                  <img
                    src={userProfile.profile_picture}
                    alt="Profile"
                    className="profile-picture"
                  />
                  <ChevronDownIcon className="chevron-icon" />
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={openModal}>📩 Set Kindle Email</MenuItem>
                <MenuItem onClick={logOut}>👋 Log out</MenuItem>
              </MenuList>
            </Menu>
            {/* Modal to set Kindle email */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Kindle Email Settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              {currentKindleEmail !== '' && (
              <FormControl>
                <FormLabel>Current address</FormLabel>
                <Input
                  value={currentKindleEmail}
                  isReadOnly
                />
              </FormControl>
              )}
              <FormControl isInvalid={!isValidEmail(kindleEmail)} mt={4}>
                <FormLabel>
                  {currentKindleEmail === ''
                    ? "Configure your Kindle Email address"
                    : "New address"}
                </FormLabel>
                <Input
                  placeholder="Enter your new Kindle email"
                  onChange={(e) => setKindleEmail(e.target.value)}
                />
                {!isValidEmail(kindleEmail) && (
                  <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>
                )}

              </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={setKindleEmailBackend}>
                  Save
                </Button>
                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
