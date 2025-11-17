import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_data: releaseYear, // match your backend field name
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  // ----------------- FIXED UPDATE FUNCTION -----------------
  const updateTitle = async (pk, releaseYear) => {
    const bookData = {
      title: newTitle,
      release_data: releaseYear,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/update/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });

      const updated = await response.json();

      setBooks((prev) =>
        prev.map((b) => (b.id === pk ? updated : b))
      );
    } catch (err) {
      console.log(err);
    }
  };
  // ---------------------------------------------------------

  return (
    <>
      <h1>Book Website</h1>

      <div>
        <input type="text" placeholder="Book Title..." onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Release year" onChange={(e) => setReleaseYear(e.target.value)} />
        <button onClick={addBook}>Add Book</button>
      </div>

      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.title}</p>
          <p>Release Year : {book.release_data}</p>

          <input
            type="text"
            placeholder="New Title..."
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <button onClick={() => updateTitle(book.id, book.release_data)}>
            Change Title
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
