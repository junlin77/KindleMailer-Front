import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterableBookTable from './components/FilterableBookTable';
import './App.css';
import BackToTopButton from './components/BackToTopButton';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <div>
        <FilterableBookTable />
        <BackToTopButton />
      </div>
      <Footer />
    </div>
  );
}
