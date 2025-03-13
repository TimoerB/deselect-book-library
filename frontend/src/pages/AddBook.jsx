import {BACKEND_URL, BOOKS_API, STORAGE_TOKEN_ENTRY} from "../utils/constants.jsx";
import axios from "axios";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import './AddBook.css';

export const AddBook = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);
  const publishedDateRef = useRef(null);

  const handleAddBook = (e) => {
    e.preventDefault();

    if (!titleRef || !titleRef.current || !authorRef || !authorRef.current) return alert('No title or author referenced!');

    const newBook = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef?.current.value,
      publishedDate: publishedDateRef?.current.value,
    }

    const token = localStorage.getItem(STORAGE_TOKEN_ENTRY);

    axios.post(BACKEND_URL + BOOKS_API, newBook,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(e => {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
          navigate('/');
        }, 2000)
      })
  }
  return (
    <>
      <h2>Add a book</h2>
      {success && <div className={"book-added"}>Book successfully added!</div>}
      <form onSubmit={handleAddBook}>
        <input type={"text"} placeholder={"Title"} ref={titleRef}/>
        <input type={"text"} placeholder={"Author"} ref={authorRef}/>
        <input type={"text"} placeholder={"Description"} ref={descriptionRef}/>
        <input type={"date"} placeholder={"Published Date"} ref={publishedDateRef}/>
        <button type={"submit"}>Add</button>
      </form>
    </>
  )
}
