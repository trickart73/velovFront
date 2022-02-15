/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom'
import ReactDOM from 'react-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import Map from './Components/Map/Map'
import Dashboard from './Components/Dashboard/Dashboard'
import Preferences from './Components/Preferences/Preferences'
import Login from './Components/Login/Login'
import Header from './Components/Header/Header'

import './App.css'

function App() {
  return (

    <div className="App">
      <Header />
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
