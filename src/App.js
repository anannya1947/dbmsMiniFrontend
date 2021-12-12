import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Watchlist } from "./components/Watchlist"
import { Watched } from "./components/Watched"
import { Add } from "./components/Add"
import Search from './components/Search'
import "./App.css"
import "./lib/css/all.min.css"

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Watchlist />} />

        <Route path="/add" element={<Add />} />

        <Route path="/watched" element={<Watched />} />

        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;