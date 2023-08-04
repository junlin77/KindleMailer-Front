import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@chakra-ui/react';
import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle'; 

const Header = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  
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
