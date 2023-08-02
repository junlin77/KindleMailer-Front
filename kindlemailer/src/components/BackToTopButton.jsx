import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; 
import '../styles/BackToTopButton.css'; 

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to show/hide the button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle the click event to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`back-to-top-button ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}>
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
