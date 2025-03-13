import React from 'react'
import './App.css'
import {Home} from "./pages/Home.jsx";
import {Link, Route, Routes} from "react-router-dom";
import {AddBook} from "./pages/AddBook.jsx";
import {Login} from "./pages/Login.jsx";
import {BookDetails} from "./pages/BookDetails.jsx";

const App = () => {

  return (
    <>
      <nav>
        <Link to={"/"} className={'nav-btn'}>Home</Link>
        <Link to={"/add"} className={'nav-btn'}>Add Book</Link>
        <Link to={"/login"} className={'nav-btn'}>Login</Link>
      </nav>

      <h1>Book Library</h1>

      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/add'} element={<AddBook/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/books/:id'} element={<BookDetails/>}/>
      </Routes>
    </>
  )
}

export default App
