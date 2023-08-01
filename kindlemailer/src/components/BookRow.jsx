import React, { useState } from 'react';
import axios from 'axios';
import {
  Tr,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Alert,
  AlertIcon,
  Box,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';

function BookRow({ Book, email }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
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
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        setIsLoading(false);
        setShowErrorModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
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
        {isLoading ? (
          <Flex justify="center" align="center">
            <Spinner size="md" color="blue.500" />
          </Flex>
        ) : (
          <Button onClick={() => handleSend(Book)}>
            <BsSend />
          </Button>
        )}

        {/* Success Modal */}
        <Modal isOpen={showSuccessModal} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={2}>
                <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="50px">
                  <AlertIcon />
                  Sent to Kindle!
                </Alert>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Error Modal */}
        <Modal isOpen={showErrorModal} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={2}>
                <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="50px">
                  <AlertIcon />
                  Error sending data. Please try again later.
                </Alert>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
}

export default BookRow;
