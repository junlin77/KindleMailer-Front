import BookRow from './BookRow';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
  } from '@chakra-ui/react'

function BookTable({ Books, email }) {
    const rows = [];
  
    Books.forEach((Book) => {
      rows.push(
        <BookRow Book={Book} email={email} />
      );
    });
  
    return (
      <Table variant="simple" colorScheme="light-grey">
        <Thead>
          <Tr>
              <Th>Author</Th>
              <Th>Title</Th>
              <Th>Publisher</Th>
              <Th>Year</Th>
              <Th>Language</Th>
              <Th>Size</Th>
              <Th>Extension</Th>
              <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    );
  }

export default BookTable;