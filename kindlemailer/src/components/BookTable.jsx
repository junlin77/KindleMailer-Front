import BookRow from './BookRow';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td, 
    Box,
    useBreakpointValue,
  } from '@chakra-ui/react'
import '../styles/BookTable.css';

function BookTable({ Books, email }) {
    const isMobile = useBreakpointValue({ base: true, sm: false });
    const rows = [];
  
    Books.forEach((Book) => {
      rows.push(
        <BookRow Book={Book} email={email} />
      );
    });
  
    return (
      isMobile ? (
        <Box className='mobile-content'>
          {Books.length === 0 ? (
            <p>No data</p>
          ) : (
            Books.map((Book) => (
              <BookRow Book={Book} email={email} />
            ))
          )}
        </Box>
      ) : (
        <Table variant="simple" colorScheme="light-grey">
          <Thead>
            <Tr>
              <Th className="empty-cell"></Th>
              <Th>Author</Th>
              <Th>Title</Th>
              <Th>Publisher</Th>
              <Th>Year</Th>
              <Th>Language</Th>
              <Th>Size</Th>
              <Th>ISBN</Th>
              <Th>Extension</Th>
            </Tr>
          </Thead>
          <Tbody className='table-body'>
            {Books.length === 0 ? (
              <Tr className='no-data-row'>
                <Td colSpan='10' textAlign='center'>No data</Td>
              </Tr>
            ) : (
              Books.map((Book) => (
                <BookRow Book={Book} email={email} />
              ))
            )}
          </Tbody>
        </Table>
      )
    );
  }

export default BookTable;