import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Grid,
} from '@chakra-ui/react';
import { BiBook } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';
import '../styles/SearchBar.css';

function SearchBar({ setSearchResults, setEmail, userProfile, currentPage }) {
  const [search, setSearch] = useState('');
  // const [currentPage, setCurrentPage] = useState(1); // Add currentPage state
  
  const [showSearchClearIcon, setShowSearchClearIcon] = useState(false);

  // Update email state in parent - FilterableBookTable component
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  // Clear input field and hide clear icon
  const handleClear = (field) => {
    switch (field) {
      case 'search':
        setSearch('');
        setShowSearchClearIcon(false);
        setSearchResults([])
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/search/?`; 

    axios
      .get(apiUrl, {
        params: {
          search,
          page: currentPage,
        },
      })
      .then((response) => {
        // If API call successful, update searchResults state in parent - FilterableBookTable component
        setSearchResults(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [search, currentPage]); // Trigger API whenever these variables change

  return (
    <FormControl className='form'>
      <Grid
        templateColumns={userProfile ? "repeat(3, 1fr)" : "repeat(4, 1fr)"}
        gap={3}
        align="center"
        width = "100%"
      >
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <BiBook />
          </InputLeftElement>
          <Input
            variant='outline'
            type='text'
            placeholder='Title, Author, or ISBN'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSearchClearIcon(!!e.target.value);
            }}
          />
          {showSearchClearIcon && (
            <InputRightElement onClick={() => handleClear('search')}>
              <AiOutlineCloseCircle />
            </InputRightElement>
          )}
        </InputGroup>
        {userProfile ? (
          <></>
        ) : (
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <AiOutlineMail />
            </InputLeftElement>
            <Input
              variant='outline'
              type='text'
              placeholder='Your Kindle Email'
              onChange={handleEmailChange}
            />
          </InputGroup>
        )}
      </Grid>
    </FormControl>
  );
}

export default SearchBar;
