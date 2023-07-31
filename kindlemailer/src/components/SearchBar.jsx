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

function SearchBar({ setSearchResults }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [extension, setExtension] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:7000/api/search/?`; 

    axios
      .get(apiUrl, {
        params: {
          title,
          author,
          extension,
          email,
        },
      })
      .then((response) => {
        // The API call is successful, update the searchResults state in the parent component
        setSearchResults(response.data);
      })
      .catch((error) => {
        // Handle errors here if needed
        console.error('Error fetching data:', error);
      });
  }, [title, author, extension, email]); // The API request will be triggered whenever any of these variables change

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </Stack>
    </FormControl>
  );
}

export default SearchBar;
