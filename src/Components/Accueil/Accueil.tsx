import React from 'react'
// import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function Accueil() {
  const btnStyle = {
    margin: '8px 0',
  }

  return (
    <div className="Dashboard">
      <h1>Bienvenue sur cette application</h1>
      <h2>Merci de vous enregistrer ou de vous connecter pour accéder à ses services</h2>
      <Button
        variant="contained"
        style={btnStyle}
        component={Link}
        to="/login"
      >
        Vous connecter

      </Button>
      <br />
      <Button
        variant="contained"
        style={btnStyle}
        component={Link}
        to="/register"
      >
        Vous enregistrer

      </Button>
    </div>

  )
}
