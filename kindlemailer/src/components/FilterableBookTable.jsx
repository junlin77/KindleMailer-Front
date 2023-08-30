import React, { useState } from 'react';
import BookTable from './BookTable';
import SearchBar from './SearchBar';
import '../styles/FilterableBookTable.css';

const FilterableBookTable = ({ userProfile, currentPage }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [email, setEmail] = useState('');

  return (
    <div className='body'>
      <SearchBar setSearchResults={setSearchResults} setEmail={setEmail} userProfile={userProfile} currentPage={currentPage} /> 
      <BookTable Books={searchResults} email={userProfile ? userProfile.kindle_email : email} /> {/* if logged in, use kindle email in userProfile */}
    </div>
  );
}

export default FilterableBookTable;
