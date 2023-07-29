import {
    Tr,
    Td,
  } from '@chakra-ui/react'

function BookRow({ Book }) {
    <span style={{ color: 'red' }}>
      {Book.name}
    </span>;

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
    </Tr>
  );
}

export default BookRow;