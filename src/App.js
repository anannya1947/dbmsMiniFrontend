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
import SearchReg from './components/SearchReg'
import "./App.css"
import "./lib/css/all.min.css"
import { Signup } from "./components/Signup";
import { useState, useEffect, useReducer } from 'react'
import { Unregistered } from "./components/Unregistered";
import jwt from 'jsonwebtoken'

function App() {

  function getAuth() {
    if (localStorage.getItem("auth")) {
      let result = localStorage.getItem("auth")
      let secret = process.env.REACT_APP_SECRET
      const decodedToken = jwt.verify(result, secret)
      console.log(decodedToken, "this is decoded token for auth ")
      return decodedToken.auth

    }
    return false;
  }
  const [auth, setAuth] = useState(getAuth())

  function getDecode() {
    if (localStorage.getItem("auth")) {
      let result = localStorage.getItem("auth")
      let secret = process.env.REACT_APP_SECRET
      const decodedToken = jwt.verify(result, secret)
      console.log(decodedToken, "this is decoded token for auth ")
      return decodedToken

    }
    return {};
  }
  const [dtoken, setDecode] = useState(getDecode())

  function getToken() {
    if (localStorage.getItem("auth")) {
      let result = localStorage.getItem("auth")

      return result
    }
    return '';
  }
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      let result = localStorage.getItem("auth")
      setToken(result)
      console.log(result)
      let secret = process.env.REACT_APP_SECRET
      const decodedToken = jwt.verify(result, secret)
      setDecode(decodedToken)
      setAuth(decodedToken.auth)


    } else {

      localStorage.setItem("auth", '')
    }
  }, [])

  function changeAuth(token, auth) {
    let decodedToken = {}
    setToken(token)
    if (token) {
      let secret = process.env.REACT_APP_SECRET
      decodedToken = jwt.verify(token, secret)
    }
    setDecode(decodedToken)
    setAuth(auth)

    localStorage.setItem("auth", token)
  }

  return (
    <Router>

      {
        auth ?
          <Header fn={changeAuth} /> : <Unregistered />
      }

      <Routes>

        <Route path="/home" element={<Home />} />

        <Route path="/watchlist" element={!auth ? <Navigate to="/home" /> : <Watchlist token={dtoken} />} />

        <Route path="/watched" element={!auth ? <Navigate to="/home" /> : <Watched token={dtoken} />} />

        <Route path="/profile" element={!auth ? <Navigate to="/home" /> : <Profile token={dtoken} />} />

        <Route path="/searchReg" element={!auth ? <Navigate to="/home" /> : <SearchReg token={dtoken} />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login fn={changeAuth} />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;