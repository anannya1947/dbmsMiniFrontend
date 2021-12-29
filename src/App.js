import React from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Header } from "./components/Header"
import { Watchlist } from "./components/Watchlist"
import { Watched } from "./components/Watched"
import { Home } from "./components/Home"
import { Login } from './components/Login'
import Search from './components/Search'
import "./App.css"
import "./lib/css/all.min.css"
import { Signup } from "./components/Signup";
import { useState, useEffect } from 'react'
import { Unregistered } from "./components/Unregistered";

function App() {

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("cache")).auth)
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("cache")).token)

  useEffect(() => {

    let result = JSON.parse(localStorage.getItem("cache"))
    console.log(result)
    setAuth(result.auth)
    setToken(result.token)
  }, [])



  function changeAuth(aut, token) {
    setAuth(aut)
    setToken(token)

    const cache = {
      auth: aut,
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

        <Route path="/watched" element={!auth ? <Navigate to="/home" /> : <Watched />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login fn={changeAuth} />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;