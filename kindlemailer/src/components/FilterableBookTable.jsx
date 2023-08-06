import React, { useState } from 'react';
import BookTable from './BookTable';
import SearchBar from './SearchBar';
import '../styles/FilterableBookTable.css';

const FilterableBookTable = ({ userProfile }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [email, setEmail] = useState('');

  return (
    <div className='body'>
      <SearchBar setSearchResults={setSearchResults} setEmail={setEmail} userProfile={userProfile} /> 
      <BookTable Books={searchResults} email={email} /> {/* Pass searchResults and email state to BookTable component */}
    </div>
  );
}

export default FilterableBookTable;
