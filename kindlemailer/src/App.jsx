import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react'

import Header from './components/Header';
import Footer from './components/Footer';

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

function BookTable({ Books }) {
  const rows = [];

  Books.forEach((Book) => {
    rows.push(
      <BookRow
        Book={Book}
        key={Book.name} />
    );
  });

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal">
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
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  );
}

function SearchBar() {
  return (
    <form>
      <Stack spacing={3} direction="row" align="center">
        <Input variant="outline" type="text" placeholder="Title" />
        <Input variant="outline" type="text" placeholder="Author"/>
        <Input variant="outline" type="text" placeholder="Extension"/>
        <Input variant="outline" type="text" placeholder="Email"/>
      </Stack>
    </form>
  );
}

function FilterableBookTable({ Books }) {
  return (
    <div>
      <SearchBar />
      <BookTable Books={Books} />
    </div>
  );
}

const BookS = [
  { Author: 'J.K. Rowling', Title: 'Harry Potter and The Sorcerer\'s Stone', Publisher: 'Scholastic', Year: '1997', Pages: '309', Language: 'English', Size: '1.8 MB', Extension: 'pdf' },
  { Author: 'Test', Title: 'Test', Publisher: 'Test', Year: 'Test', Pages: 'Test', Language: 'Test', Size: 'Test', Extension: 'Test' },
];

export default function App() {
  return (
    <div>
      <Header />
      <FilterableBookTable Books={BookS} />
      <Footer />
    </div>
  );
}
