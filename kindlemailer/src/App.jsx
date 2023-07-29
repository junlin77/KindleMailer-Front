function BookRow({ Book }) {
  const name = Book.stocked ? Book.name :
    <span style={{ color: 'red' }}>
      {Book.name}
    </span>;

  return (
    <tr>
      <td>{Book.Author}</td>
      <td>{Book.Title}</td>
      <td>{Book.Publisher}</td>
      <td>{Book.Year}</td>
      <td>{Book.Pages}</td>
      <td>{Book.Language}</td>
      <td>{Book.Size}</td>
      <td>{Book.Extension}</td>
    </tr>
  );
}

function BookTable({ Books }) {
  const rows = [];
  let lastCategory = null;

  Books.forEach((Book) => {
    rows.push(
      <BookRow
        Book={Book}
        key={Book.name} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Publisher</th>
          <th>Year</th>
          <th>Pages</th>
          <th>Language</th>
          <th>Size</th>
          <th>Extension</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show Books in stock
      </label>
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
  { Author: 'J.K. Rowling', Title: 'Harry Potter and the Sorcerer\'s Stone', Publisher: 'Scholastic', Year: '1997', Pages: '309', Language: 'English', Size: '1.8 MB', Extension: 'pdf' }
];

export default function App() {
  return <FilterableBookTable Books={BookS} />;
}
