import React from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Watchlist } from "./components/Watchlist"
import { Watched } from "./components/Watched"
import { Add } from "./components/Add"
import {Login} from './components/Login'
import Search from './components/Search'
import "./App.css"
import "./lib/css/all.min.css"
import { Signup } from "./components/Signup";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Watchlist />} />

        <Route path="/add" element={<Add />} />

        <Route path="/watched" element={<Watched />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
  );
}

export default App;