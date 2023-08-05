import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@chakra-ui/react';
import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle'; 
import axios from 'axios';

const Header = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse),
      sendTokenToBackend(tokenResponse.access_token);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const sendTokenToBackend = async (access_token) => {
    try {
      // Send the access token to your Django backend
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { access_token });
      console.log('Backend response:', response.data);
    } catch (error) {
      console.error('Error sending token:', error);
    }
  };
  
  return (
    <div className="header">
      <div className="header-text">
        <h5>KindleMailer</h5>
        <p>Send books to your Kindle with ease.</p>
      </div>
      <div className="header-controls">
        <Button variant='ghost' onClick={() => login()} className="header-button">
          Sign in with Google 🚀
        </Button>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header;
