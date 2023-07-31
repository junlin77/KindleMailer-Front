import React from 'react';
import axios from 'axios';
import { Tr, Td } from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';

function BookRow({ Book }) {
  const handleSend = (Book) => {
    const apiUrl = `http://127.0.0.1:7000/api/send_to_kindle/`;
    const data = {
      book_to_download: Book,
      kindle_email: 'test@kindle.com'
    }

    axios
      .post(apiUrl, data)
      .then((response) => {
        // The POST request is successful, do something with the response if needed
        console.log('POST request successful:', response);
      })
      .catch((error) => {
        // Handle errors here if needed
        console.error('Error sending data:', error);
      });
  };

  return (
    <Tr>
      <Td>{Book.Author}</Td>
      <Td>{Book.Title}</Td>
      <Td>{Book.Publisher}</Td>
      <Td>{Book.Year}</Td>
      <Td>{Book.Pages}</Td>
      <Td>{Book.Language}</Td>
      <Td>{Book.Size}</Td>
      <Td>{Book.Extension}</Td>
      <Td>
        <button onClick={() => handleSend(Book)}>
          <BsSend />
        </button>
      </Td>
    </Tr>
  );
}

export default BookRow;
