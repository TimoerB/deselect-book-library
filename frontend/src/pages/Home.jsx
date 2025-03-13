import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL, BOOKS_API} from "../utils/constants.jsx";
import {useNavigate} from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

      {loading && <>Loading...</>}

      <table border="1" cellPadding="10" cellSpacing="0" style={{borderCollapse: "collapse"}}>
        <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Published Date</th>
        </tr>
        </thead>
        <tbody>
        {books.map(book => <tr key={book._id} onClick={() => navigate(`/books/${book._id}`)}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.description}</td>
          <td>{book.publishedDate?.toLocaleString()}</td>
        </tr>)}
        </tbody>
      </table>
    </>
  )
}
