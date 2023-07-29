import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle'; 

const Header = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h5>KindleMailer</h5>
        <p>Email searched books to your Kindle!</p>
      </div>
      <DarkModeToggle />
    </div>
  );
};

export default Header;
