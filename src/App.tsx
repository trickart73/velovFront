/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'

import Map from './Components/Map/Map'
import Dashboard from './Components/Dashboard/Dashboard'
import Preferences from './Components/Preferences/Preferences'
import Login from './Components/Login/Login'

import './App.css'

function App() {
  // const [token, setToken] = useState()
  // if (!token) {
  //   return <Login setToken={setToken} />
  // }

  return (

    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>Velov x Keyrus</h1>
          <Link to="/">Home</Link>
          <Link to="/map">Map</Link>
          <Link to="/preferences">Preferences</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
