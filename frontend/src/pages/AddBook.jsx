import {BOOKS_API} from "../utils/constants.jsx";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import './AddBook.css';
import {usePostHook} from "../hooks/useApiHook.js";

export const AddBook = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);
  const publishedDateRef = useRef(null);

  const postHook = usePostHook(BOOKS_API, setSuccess, setError, navigate);

  const handleAddBook = (e) => {
    e.preventDefault();

    if (!titleRef?.current?.value || !authorRef?.current?.value) return alert('No title or author referenced!');

    const newBook = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef?.current.value,
      publishedDate: publishedDateRef?.current.value,
    }

    postHook(newBook);
  }
  return (
    <>
      <h2>Add a book</h2>
      {success && <div className={"alert"}>Book successfully added!</div>}
      {error && <div className={"alert error"}>{error}</div>}
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
