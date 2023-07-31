import BookRow from './BookRow';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
  } from '@chakra-ui/react'

function BookTable({ Books }) {
    const rows = [];
  
    Books.forEach((Book) => {
      rows.push(
        <BookRow Book={Book} />
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
              <Th>Pages</Th>
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