/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom'
import ReactDOM from 'react-dom'

import Map from './Components/Map/Map'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Login from './Components/Login/Login'
import Header from './Components/Header/Header'
import Register from './Components/Register/Register'
import RequireAuth from './Components/RequireAuth/RequireAuth'

import './App.css'

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Header />
        {/* <nav>
          <h1>Velov x Keyrus</h1>
          <Link to="/">Home</Link>
          <Link to="/map">Map</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </nav> */}
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App
