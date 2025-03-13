import {BACKEND_URL, BOOKS_API} from "../utils/constants.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './AddBook.css';
import {useDeleteHook, usePutHook} from "../hooks/useApiHook.js";

export const BookDetails = () => {
  const {id} = useParams();

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const putHook = usePutHook(BOOKS_API, setSuccess, setError, navigate);
  const deleteHook = useDeleteHook(BOOKS_API, setSuccess, setError);

  const handleUpdateBook = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      description,
      publishedDate,
      id
    }

    putHook(updatedBook);
  }

  useEffect(() => {
    axios.get(BACKEND_URL + BOOKS_API + "/" + id)
      .then(e => {
        setTitle(e.data.title)
        setAuthor(e.data.author)
        setDescription(e.data.description)
        setPublishedDate(e.data.publishedDate)
      })
  }, []);

  return (
    <>
      <h2>Book details</h2>
      {success && <div className={"alert"}>Book successfully updated!</div>}
      {error && <div className={"alert error"}>{error}</div>}
      <form onSubmit={handleUpdateBook}>
        <input type={"text"} placeholder={"Title"} value={title} onChange={e => setTitle(e.target.value)}/>
        <input type={"text"} placeholder={"Author"} value={author} onChange={e => setAuthor(e.target.value)}/>
        <input type={"text"} placeholder={"Description"} value={description}
               onChange={e => setDescription(e.target.value)}/>
        <input type={"date"} placeholder={"Published Date"} value={publishedDate ? publishedDate.split("T")[0] : ''}
               onChange={e => setPublishedDate(e.target.value)}/>
        <button type={"submit"}>Update</button>
      </form>
      <button onClick={() => deleteHook(id)} style={{marginTop: '1rem', width: '100%'}}>Delete</button>
    </>
  )
}
