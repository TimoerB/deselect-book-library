import React from 'react'
import './App.css'
import {Home} from "./pages/Home.jsx";
import {Link, Route, Routes} from "react-router-dom";
import {AddBook} from "./pages/AddBook.jsx";

const App = () => {

  return (
    <>
      <nav>
        <Link to={"/"} className={'nav-btn'}>Home</Link>
        <Link to={"/add"} className={'nav-btn'}>Add Book</Link>
      </nav>


      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/add'} element={<AddBook/>}/>
      </Routes>
    </>
  )
}

export default App
