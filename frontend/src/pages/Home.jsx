import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL, BOOKS_API} from "../utils/constants.jsx";

export const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_URL + BOOKS_API)
      .then(data => setBooks(data.data))
  }, []);
  return (
    <>
      <h2>Book Library</h2>
      <ul>
        {books.map(book => <li key={book._id}>
          <p>{book.title} by {book.author}</p>
          <small>
            <span style={{color: 'gray'}}>{book.description}</span><br/>
            <i>{book.publishedDate.toLocaleString()}</i>
          </small>
        </li>)}
      </ul>
    </>
  )
}
