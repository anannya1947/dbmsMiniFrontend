import React from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Header } from "./components/Header"
import { Watchlist } from "./components/Watchlist"
import { Watched } from "./components/Watched"
import { Home } from "./components/Home"
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import Search from './components/Search'
import "./App.css"
import "./lib/css/all.min.css"
import { Signup } from "./components/Signup";
import { useState, useEffect, useReducer } from 'react'
import { Unregistered } from "./components/Unregistered";

function App() {

  function getAuth() {
    if (localStorage.getItem("cache")) {
      let result = JSON.parse(localStorage.getItem("cache"))
      return result.token.auth

    }
    return false;
  }
  const [auth, setAuth] = useState(getAuth())


  function getToken() {
    if (localStorage.getItem("cache")) {
      let result = JSON.parse(localStorage.getItem("cache"));
      return result.token
    }
    return {};
  }
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    if (localStorage.getItem("cache")) {
      let result = JSON.parse(localStorage.getItem("cache"))
      console.log(result)
      setAuth(result.token.auth)
      setToken(result.token)

    } else {
      const def = {
        token: { auth: false }
      }
      localStorage.setItem("cache", JSON.stringify(def))
    }
  }, [])

  function changeAuth(token) {
    setAuth(token.auth)
    setToken(token)
    const cache = {
      token: token
    }
    console.log(cache)

    localStorage.setItem("cache", JSON.stringify(cache))
  }

  return (
    <Router>

      {
        auth ?
          <Header fn={changeAuth} /> : <Unregistered />
      }

      <Routes>

        <Route path="/home" element={<Home />} />

        <Route path="/watchlist" element={!auth ? <Navigate to="/home" /> : <Watchlist token={token} />} />

        <Route path="/watched" element={!auth ? <Navigate to="/home" /> : <Watched token={token} />} />

        <Route path="/profile" element={!auth ? <Navigate to="/home" /> : <Profile token={token} />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login fn={changeAuth} />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;