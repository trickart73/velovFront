import React from 'react'
// import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <div className="Dashboard">
      <h1>Bienvenue sur cette application</h1>
      <h2>Merci de vous enregistrer ou de vous connecter pour accéder à ses services</h2>
      <Button variant="contained">Vous connecter</Button>
      <Button variant="contained">Vous enregistrer</Button>
    </div>

  )
}
