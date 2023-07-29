import Header from './components/Header';
import Footer from './components/Footer';
import FilterableBookTable from './components/FilterableBookTable';

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
