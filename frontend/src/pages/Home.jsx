import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL, BOOKS_API} from "../utils/constants.jsx";
import {useDeleteHook} from "../hooks/useApiHook.js";
import {useNavigate} from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteHook = useDeleteHook(BOOKS_API, setSuccess, setError, navigate);

  useEffect(() => {
    axios.get(BACKEND_URL + BOOKS_API)
      .then(data => {
        setBooks(data.data)
        setLoading(false);
      })
  }, []);
  return (
    <>
      <h2>Books</h2>
      {success && <div className={"alert"}>Book successfully deleted!</div>}
      {error && <div className={"alert error"}>{error}</div>}
      <ul>
        {loading && <>Loading...</>}
        {books.map(book => <li key={book._id} onClick={() => navigate(`/books/${book._id}`)}>
          <p>{book.title} by {book.author}</p>
          <small>
            <span style={{color: 'gray'}}>{book.description}</span><br/>
            <i>{book.publishedDate?.toLocaleString()}</i>
            <button onClick={() => deleteHook(book._id)}>Delete book</button>
          </small>
        </li>)}
      </ul>
    </>
  )
}
