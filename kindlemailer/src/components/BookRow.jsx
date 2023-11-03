import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Heading,
  Text,
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  useBreakpointValue,
  Box,
} from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import Swal from 'sweetalert2';
import '../styles/BookRow.css';

function BookRow({ Book, email }) {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [details, setDetails] = useState(null);

  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    console.log('Book prop changed:', Book);
    fetchCoverImage(); // Fetch cover image when Book prop changes
  }, [Book]);

  useEffect(() => {
    fetchCoverImage(); // Fetch cover image when component mounts
  }, []);

  const fetchCoverImage = () => {
    const coverId = 'isbn'; 
    const coverValue = Book.isbn; 
  
    // Construct the API request URL for Open Library Covers API
    const apiUrl = `https://covers.openlibrary.org/b/${coverId}/${coverValue}-M.jpg`;
    const img = new Image();
    img.src = apiUrl;
    img.onload = function () {
      setImageWidth(this.width);
      setImageHeight(this.height); 
    };
    setCoverImage(apiUrl);
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
      ipfs_cid: details.ipfs_cid,
      kindle_email: email,
      title: details.title,
      extension: details.extension,
    };

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log('POST request successful:', response);
        setIsLoading(false);
        onClose();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: '\'' + details.title + '\'' + ' sent to ' + '\'' + email + '\'',
        });
      })
      .catch((error) => {
        setIsLoading(false);
        onClose();
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

  const isIsbn = Book.isbn !== null;

  return (
    isMobile ? (
      <Card variant='outline' overflow='hidden' gap='8' direction={{ base: 'row' }} p={2} align='center'>
        {isIsbn && imageHeight > 1 && imageWidth > 1 ? (
          <img
            id='imageElement'
            style={{
              objectFit: 'cover',
              maxWidth: { base: '30%', sm: '100px' },
              marginLeft: '2rem'
            }}
            src={coverImage}
            alt={Book.title}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{ marginLeft: '4rem', marginRight: '2rem' }}> {/* Add left margin to the icon */}
              <MdOutlineImageNotSupported size={100} color="gray" />
            </div>
        )}
        <Stack mt>
          <CardBody align='left'>
            <Text fontSize='xl' fontWeight='semibold'>{Book.title}</Text>
            <Text fontSize='m' color='gray.500'>Author: {Book.author}</Text>
            <Text fontSize='m' color='gray.500'>Year: {Book.year}</Text>
            <Text fontSize='m' color='gray.500'>Language: {Book.language}</Text>
            <Text fontSize='m' color='gray.500'>ISBN: {Book.isbn}</Text>
            <Text fontSize='m' color='gray.500'>Extension: {Book.extension}</Text>
          </CardBody>
          <CardFooter>
            {isLoading ? (
              <Flex justify='center' align='center'>
                <Spinner size='md' color='blue.500' />
              </Flex>
            ) : (
              <Flex justify='right' align='right'>
                <Button onClick={async () => {
                  await fetchDetails();
                  if (details) {
                    handleSend(Book);
                  }
                }}>
                  <BsSend /> Send to Kindle
                </Button>
              </Flex>
            )}
          </CardFooter>
        </Stack>
      </Card>
    ) : (
      <Tr onClick={onOpen}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Book Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {details ? (
                <div className='details-container'>
                  {coverImage && <img src={coverImage} alt="Cover" />}
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
          {coverImage && <img src={coverImage} alt="Cover"/>}
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
    )
  );
}

export default BookRow;
