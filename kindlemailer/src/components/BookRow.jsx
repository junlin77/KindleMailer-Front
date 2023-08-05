import React, { useState } from 'react';
import axios from 'axios';
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';
import Swal from 'sweetalert2';

function BookRow({ Book, email }) {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Tr>
      <Td>{Book.Author}</Td>
      <Td>{Book.Title}</Td>
      <Td>{Book.Publisher}</Td>
      <Td>{Book.Year}</Td>
      <Td>{Book.Language}</Td>
      <Td>{Book.Size}</Td>
      <Td>{Book.Extension}</Td>
      <Td>
        {isLoading ? (
          <Flex justify="center" align="center">
            <Spinner size="md" color="blue.500" />
          </Flex>
        ) : (
          <Button onClick={() => handleSend(Book)}>
            <BsSend />
          </Button>
        )}
      </Td>
    </Tr>
  );
}

export default BookRow;
