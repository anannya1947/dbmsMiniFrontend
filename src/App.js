import React from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Header } from "./components/Header"
import { Watchlist } from "./components/Watchlist"
import { Watched } from "./components/Watched"
import { Add } from "./components/Add"
import { Login } from './components/Login'
import Search from './components/Search'
import "./App.css"
import "./lib/css/all.min.css"
import { Signup } from "./components/Signup";
import { useState, useEffect } from 'react'
import { Unregistered } from "./components/Unregistered";

function App() {

  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState({})


  function changeAuth(aut, token) {
    setAuth(aut)
    setToken(token)
  }

  return (
    <Router>

      {
        auth ?
          <Header fn={changeAuth} /> : <Unregistered />
      }

      <Routes>

        <Route path="/" element={!auth ? <Navigate to="/login" /> : <Watchlist token={token} />} />

        <Route path="/add" element={<Add />} />

        <Route path="/watched" element={<Watched />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login fn={changeAuth} />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;