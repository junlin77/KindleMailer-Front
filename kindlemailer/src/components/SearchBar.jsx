import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { BiBook } from 'react-icons/bi';
import { AiOutlineUser, AiOutlineFile, AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';
import '../styles/SearchBar.css';

function SearchBar({ setSearchResults, setEmail }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [extension, setExtension] = useState('');

  // Update email state in parent - FilterableBookTable component
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/search/?`; 

    axios
      .get(apiUrl, {
        params: {
          title,
          author,
          extension,
        },
      })
      .then((response) => {
        // If API call successful, update searchResults state in parent - FilterableBookTable component
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [title, author, extension]); // Trigger API whenever these variables change

  return (
    <FormControl className='form'>
      <Stack spacing={3} direction='row' align='center'>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <BiBook />
          </InputLeftElement>
          <Input
            variant='outline'
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiOutlineUser />
          </InputLeftElement>
          <Input
            variant='outline'
            type='text'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiOutlineFile />
          </InputLeftElement>
          <Input
            variant='outline'
            type='text'
            placeholder='Extension'
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiOutlineMail />
          </InputLeftElement>
          <Input
            variant='outline'
            type='text'
            placeholder='Email'
            onChange={handleEmailChange}
          />
        </InputGroup>
      </Stack>
    </FormControl>
  );
}

export default SearchBar;
