import BookTable from './BookTable';
import SearchBar from './SearchBar';
import '../styles/FilterableBookTable.css';

function FilterableBookTable({ Books }) {    
    return (
        <div className='body'>
            <SearchBar />
            <BookTable Books={Books} />
        </div>
    );
}

export default FilterableBookTable;