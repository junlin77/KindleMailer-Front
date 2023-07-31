import React, { useState } from 'react';
import BookTable from './BookTable';
import SearchBar from './SearchBar';
import '../styles/FilterableBookTable.css';

function FilterableBookTable() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className='body'>
      <SearchBar setSearchResults={setSearchResults} />
      <BookTable Books={searchResults} />
    </div>
  );
}

export default FilterableBookTable;
