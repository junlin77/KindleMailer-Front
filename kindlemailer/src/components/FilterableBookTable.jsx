import BookTable from './BookTable';
import SearchBar from './SearchBar';

function FilterableBookTable({ Books }) {
    return (
        <div>
        <SearchBar />
        <BookTable Books={Books} />
        </div>
    );
}

export default FilterableBookTable;