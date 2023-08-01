import React, { useState } from 'react';
import BookTable from './BookTable';
import SearchBar from './SearchBar';
import '../styles/FilterableBookTable.css';

function FilterableBookTable() {
  const [searchResults, setSearchResults] = useState([]);
  const [email, setEmail] = useState('');

  return (
    <div className='body'>
      <SearchBar setSearchResults={setSearchResults} setEmail={setEmail} /> 
      <BookTable Books={searchResults} email={email} /> {/* Pass searchResults and email state to BookTable component */}
    </div>
  );
}

export default FilterableBookTable;
