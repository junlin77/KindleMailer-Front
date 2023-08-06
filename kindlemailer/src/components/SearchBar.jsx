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
import { AiOutlineCloseCircle, AiOutlineUser, AiOutlineFile, AiOutlineMail } from 'react-icons/ai';
import { TbBuilding, TbLanguageKatakana } from 'react-icons/tb';
import { SlCalender } from 'react-icons/sl';
import axios from 'axios';
import '../styles/SearchBar.css';

function SearchBar({ setSearchResults, setEmail, userProfile }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [extension, setExtension] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  
  const [showTitleClearIcon, setShowTitleClearIcon] = useState(false);
  const [showAuthorClearIcon, setShowAuthorClearIcon] = useState(false);
  const [showExtensionClearIcon, setShowExtensionClearIcon] = useState(false);
  const [showPublisherClearIcon, setShowPublisherClearIcon] = useState(false);
  const [showYearClearIcon, setShowYearClearIcon] = useState(false);
  const [showLanguageClearIcon, setShowLanguageClearIcon] = useState(false);

  // Update email state in parent - FilterableBookTable component
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  // Clear input field and hide clear icon
  const handleClear = (field) => {
    switch (field) {
      case 'title':
        setTitle('');
        setShowTitleClearIcon(false);
        break;
      case 'author':
        setAuthor('');
        setShowAuthorClearIcon(false);
        break;
      case 'extension':
        setExtension('');
        setShowExtensionClearIcon(false);
        break;
      case 'publisher':
        setPublisher('');
        setShowPublisherClearIcon(false);
        break;
      case 'year':
        setYear('');
        setShowYearClearIcon(false);
        break;
      case 'language':
        setLanguage('');
        setShowLanguageClearIcon(false);
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
          title,
          author,
          extension,
          publisher,
          year,
          language,
        },
      })
      .then((response) => {
        // If API call successful, update searchResults state in parent - FilterableBookTable component
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [title, author, extension, publisher, year, language]); // Trigger API whenever these variables change

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
            placeholder='Title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowTitleClearIcon(!!e.target.value);
            }}
          />
          {showTitleClearIcon && (
            <InputRightElement onClick={() => handleClear('title')}>
              <AiOutlineCloseCircle />
            </InputRightElement>
          )}
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
            onChange={(e) => {
              setAuthor(e.target.value)
              setShowAuthorClearIcon(!!e.target.value);
            }}
          />
          {showAuthorClearIcon && (
            <InputRightElement onClick={() => handleClear('author')}>
              <AiOutlineCloseCircle />
            </InputRightElement>
          )}
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
            onChange={(e) => {
              setExtension(e.target.value)
              setShowExtensionClearIcon(!!e.target.value);
            }}
          />
          {showExtensionClearIcon && (
            <InputRightElement onClick={() => handleClear('extension')}>
              <AiOutlineCloseCircle />
            </InputRightElement>
          )}
        </InputGroup>
        {userProfile ? (
          <>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <TbBuilding />
              </InputLeftElement>
              <Input
                variant='outline'
                type='text'
                placeholder='Publisher'
                value={publisher}
                onChange={(e) => {
                  setPublisher(e.target.value);
                  setShowPublisherClearIcon(!!e.target.value);
                }}
              />
              {showPublisherClearIcon && (
                <InputRightElement onClick={() => handleClear('publisher')}>
                  <AiOutlineCloseCircle />
                </InputRightElement>
              )}
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SlCalender />
              </InputLeftElement>
              <Input
                variant='outline'
                type='text'
                placeholder='Year'
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setShowYearClearIcon(!!e.target.value);
                }}
              />
              {showYearClearIcon && (
                <InputRightElement onClick={() => handleClear('year')}>
                  <AiOutlineCloseCircle />
                </InputRightElement>
              )}
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <TbLanguageKatakana />
              </InputLeftElement>
              <Input
                variant='outline'
                type='text'
                placeholder='Language'
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setShowLanguageClearIcon(!!e.target.value);
                }}
              />
              {showLanguageClearIcon && (
                <InputRightElement onClick={() => handleClear('language')}>
                  <AiOutlineCloseCircle />
                </InputRightElement>
              )}
            </InputGroup>
          </>
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
