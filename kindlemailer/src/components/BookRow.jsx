import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';
import Swal from 'sweetalert2';
import '../styles/BookRow.css';

function BookRow({ Book, email }) {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [details, setDetails] = useState(null);

  // Reset cover image when a new search result is received
  useEffect(() => {
    setCoverImage('');
  }, [Book]); // Listen for changes in the Book prop

  useEffect(() => {
    fetchCoverImage(); // Fetch cover image when component mounts
  }, []);

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchCoverImage = () => {
    // Construct the API request URL for Google Books API
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${Book.isbn}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Get the cover image URL from the API response
        if (response.data.items && response.data.items.length > 0) {
          const item = response.data.items[0];
          const coverImageLink = item.volumeInfo.imageLinks?.thumbnail || '';
          setCoverImage(coverImageLink);
        }
      })
      .catch((error) => {
        console.error('Error fetching cover image:', error);
      });
  };

  const fetchDetails = () => {
    // Construct the API request URL for your API
    const apiUrl = 'http://127.0.0.1:8000/api/details/';
    const params = {
      id: Book.id, 
      source: Book.source,
      pages: Book.pages,

    };

    axios
      .post(apiUrl, params)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  };

  const handleSend = (Book) => {
    setIsLoading(true);
    const apiUrl = `http://127.0.0.1:8000/api/send_to_kindle/`;
    const data = {
      book_to_download: Book,
      kindle_email: email,
    };

    axios
      .post(apiUrl, data)
      .then((response) => {
        // The POST request is successful, show the success modal
        console.log('POST request successful:', response);
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: '\'' + Book.Title + '\'' + ' sent to ' + '\'' + email + '\'',
        });
      })
      .catch((error) => {
        setIsLoading(false);
        let text = 'Error sending data. Please try again later.';
        if (error.response && error.response.status === 400) {
          console.error("Error:", error.response.data.error);
          text = error.response.data.error;
        } else {
          console.error('Error sending data:', error);
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: text,
        });
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      fetchDetails();
    }
  }, [isOpen]);

  return (
    <Tr onClick={onOpen}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {details ? (
              <div className='details-container'>
                {coverImage && <Image src={coverImage} alt="Cover" />}
                <div className='details-text'>
                  <p>Author: {details.author}</p>
                  <p>Title: {details.title}</p>
                  <p>Filesize: {details.filesize}</p>
                  <p>ISBN: {details.isbn}</p>
                  <p>Extension: {details.extension}</p>
                  <p>Source: {details.source}</p>
                </div>
              </div>
            ) : (
              <p>Currently unavailable</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {isLoading ? (
              <Flex justify="center" align="center">
                <Spinner size="md" color="blue.500" />
              </Flex>
            ) : (
              <Button onClick={() => handleSend(Book)}>
                <BsSend />  Send to Kindle
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Td>
        {/* Render the cover image */}
        {coverImage && <Image src={coverImage} alt="Cover"/>}
      </Td>
      <Td>{Book.author}</Td>
      <Td>{Book.title}</Td>
      <Td>{Book.publisher}</Td>
      <Td>{Book.year}</Td>
      <Td>{Book.language}</Td>
      <Td>{Book.filesize}</Td>
      <Td>{Book.isbn}</Td>
      <Td>{Book.extension}</Td>
    </Tr>
  );
}

export default BookRow;
