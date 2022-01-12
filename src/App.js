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
import { GlobalProvider } from './context/GlobalState'
import Footer from "./components/Footer";
import WatchHistory from "./components/WatchHistory";
import ProfileUpdate from "./components/ProfileUpdate";
function App() {

  function getAuth() {
    if (sessionStorage.getItem("auth")) {
      let result = sessionStorage.getItem("auth")
      let secret = process.env.REACT_APP_SECRET
      var decodedToken
      jwt.verify(result, secret, function (err, decode) {
        if (err) { decodedToken = {} }
        else {
          decodedToken = decode
        }
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("got exec here for exp")
          decodedToken = {}
        }
      })
      if (decodedToken) {
        console.log(decodedToken, "this is decoded token for auth ")
        return decodedToken.auth
      }
      return false;

    }
    return false;
  }
  const [auth, setAuth] = useState(getAuth())

  function getDecode() {
    if (sessionStorage.getItem("auth")) {
      let result = sessionStorage.getItem("auth")
      let secret = process.env.REACT_APP_SECRET
      var decodedToken
      jwt.verify(result, secret, function (err, decode) {
        if (err) { decodedToken = {} }
        else {
          decodedToken = decode
        }
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("got exec here for exp")
          decodedToken = {}
        }

      })
      if (decodedToken) {
        console.log(decodedToken, "this is decoded token for auth ")
        return decodedToken
      }
      return {}

    }
    return {};
  }
  const [dtoken, setDecode] = useState(getDecode())

  function getToken() {
    if (sessionStorage.getItem("auth")) {
      let result = sessionStorage.getItem("auth")

      return result
    }
    return '';
  }
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      let result = sessionStorage.getItem("auth")
      setToken(result)
      console.log(result)
      let secret = process.env.REACT_APP_SECRET
      var decodedToken
      jwt.verify(result, secret, function (err, decode) {

        if (err) {
          console.log("got exec err of token ")
          console.log(err)
          decodedToken = {}
        }
        else {
          decodedToken = decode
        }
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("got exec here for exp")
          decodedToken = {}
        }
      })

      if (decodedToken) {
        setDecode(decodedToken)
        setAuth(decodedToken.auth)
      }
      else {
        setDecode({})
        setAuth(false)
      }


    } else {

      sessionStorage.setItem("auth", '')
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

    sessionStorage.setItem("auth", token)
  }

  return (
    <GlobalProvider>
      <Router>

        {
          auth ?
            <Header fn={changeAuth} /> : <Unregistered />
        }

        <Routes>

          <Route path="/home" element={<Home token={dtoken} />} />

          <Route path="/watchlist" element={!auth ? <Navigate to="/home" /> : <Watchlist token={dtoken} tk={token} />} />

          <Route path="/watched" element={!auth ? <Navigate to="/home" /> : <Watched token={dtoken} tk={token} />} />

          <Route path="/profile" element={!auth ? <Navigate to="/home" /> : <Profile token={dtoken} tk={token} />} />

          <Route path="/searchReg" element={!auth ? <Navigate to="/home" /> : <SearchReg token={dtoken} tk={token} />} />

          <Route path="/WatchHistory" element={!auth ? <Navigate to="/home" /> : <WatchHistory token={dtoken} tk={token} />} />

          <Route path="/ProfileUpdate" element={!auth ? <Navigate to="/home" /> : < ProfileUpdate token={dtoken} tk={token} />} />

          <Route path="/search" element={<Search />} />

          <Route path="/login" element={<Login fn={changeAuth} />} />

          <Route path="/signup" element={<Signup />} />

        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;